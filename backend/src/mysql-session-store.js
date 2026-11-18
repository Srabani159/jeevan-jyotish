import session from "express-session";
import pool from "./db.js";

const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;
const CLEANUP_INTERVAL_MS = 15 * 60 * 1000;

export default class MySQLSessionStore extends session.Store {
  constructor() {
    super();
    this.cleanupTimer = setInterval(() => {
      pool.execute("DELETE FROM admin_sessions WHERE expires <= ?", [Math.floor(Date.now() / 1000)])
        .catch((error) => console.error("Could not clear expired admin sessions:", error));
    }, CLEANUP_INTERVAL_MS);
    this.cleanupTimer.unref();
  }

  get(sessionId, callback) {
    pool.execute(
      "SELECT data, expires FROM admin_sessions WHERE session_id = ?",
      [sessionId],
    ).then(([rows]) => {
      const stored = rows[0];
      if (!stored || stored.expires <= Math.floor(Date.now() / 1000)) {
        callback(null, null);
        return;
      }
      try {
        callback(null, JSON.parse(stored.data));
      } catch (error) {
        callback(error);
      }
    }).catch(callback);
  }

  set(sessionId, sessionData, callback) {
    const expiresAt = sessionData.cookie?.expires
      ? new Date(sessionData.cookie.expires).getTime()
      : Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
    const expires = Math.floor(expiresAt / 1000);
    pool.execute(
      `INSERT INTO admin_sessions (session_id, expires, data)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE expires = VALUES(expires), data = VALUES(data)`,
      [sessionId, expires, JSON.stringify(sessionData)],
    ).then(() => callback?.(null)).catch((error) => callback?.(error));
  }

  touch(sessionId, sessionData, callback) {
    const expiresAt = sessionData.cookie?.expires
      ? new Date(sessionData.cookie.expires).getTime()
      : Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
    pool.execute(
      "UPDATE admin_sessions SET expires = ? WHERE session_id = ?",
      [Math.floor(expiresAt / 1000), sessionId],
    ).then(() => callback?.(null)).catch((error) => callback?.(error));
  }

  destroy(sessionId, callback) {
    pool.execute(
      "DELETE FROM admin_sessions WHERE session_id = ?",
      [sessionId],
    ).then(() => callback?.(null)).catch((error) => callback?.(error));
  }

  close() {
    clearInterval(this.cleanupTimer);
  }
}
