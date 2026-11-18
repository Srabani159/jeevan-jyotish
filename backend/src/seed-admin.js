import "dotenv/config";
import bcrypt from "bcryptjs";
import pool from "./db.js";

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !password || password.length < 12 || Buffer.byteLength(password, "utf8") > 72) {
    throw new Error("Set a valid ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters and no more than 72 UTF-8 bytes in backend/.env.");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await pool.execute(
    `INSERT INTO admin_users (email, password_hash)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), is_active = 1`,
    [email, passwordHash],
  );
  console.log(`Admin credentials seeded for ${email}.`);
}

seedAdmin()
  .catch((error) => {
    console.error("Admin seeding failed:", error.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
