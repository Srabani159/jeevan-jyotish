import "dotenv/config";
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import pool from "./db.js";

const migrationsDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../migrations",
);

async function migrate() {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        name VARCHAR(255) NOT NULL PRIMARY KEY,
        applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    const files = (await readdir(migrationsDirectory))
      .filter((name) => name.endsWith(".sql"))
      .sort();

    for (const name of files) {
      const [applied] = await connection.execute(
        "SELECT name FROM schema_migrations WHERE name = ?",
        [name],
      );
      if (applied.length > 0) {
        console.log(`Already applied: ${name}`);
        continue;
      }

      const contents = await readFile(path.join(migrationsDirectory, name), "utf8");
      const statements = contents.split(";").map((statement) => statement.trim()).filter(Boolean);
      await connection.beginTransaction();
      try {
        for (const statement of statements) {
          await connection.query(statement);
        }
        await connection.execute("INSERT INTO schema_migrations (name) VALUES (?)", [name]);
        await connection.commit();
        console.log(`Applied: ${name}`);
      } catch (error) {
        await connection.rollback();
        throw error;
      }
    }
  } finally {
    connection.release();
    await pool.end();
  }
}

migrate().catch((error) => {
  console.error("Database migration failed:", error.message);
  process.exitCode = 1;
});
