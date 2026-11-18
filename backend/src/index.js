import "dotenv/config";
import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import session from "express-session";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import pool from "./db.js";
import MySQLSessionStore from "./mysql-session-store.js";

const PORT = Number(process.env.API_PORT || 3001);
const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_COOKIE = "jj_admin_session";
const SESSION_MAX_AGE = 8 * 60 * 60 * 1000;
const SESSION_COOKIE_SAME_SITE = (process.env.SESSION_COOKIE_SAME_SITE || "lax").toLowerCase();
const SERVICE_OPTIONS = new Set([
  "Kundli Services",
  "Horoscope Services",
  "Tarot Card Services",
  "Palmistry Services",
  "Vastu Shastra Services",
  "Gemstones Services",
  "Numerology Services",
  "Rune-Casting Services",
  "Pooja Services",
  "Baby Names By Nakshatra",
]);
const GENDERS = new Set(["Male", "Female"]);
const ENQUIRY_STATUSES = new Set(["new", "contacted", "resolved"]);
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!SESSION_SECRET || SESSION_SECRET.length < 32) {
  throw new Error("SESSION_SECRET must be set to a random value of at least 32 characters.");
}
if (!["lax", "strict", "none"].includes(SESSION_COOKIE_SAME_SITE)) {
  throw new Error("SESSION_COOKIE_SAME_SITE must be lax, strict, or none.");
}

const app = express();
const sessionStore = new MySQLSessionStore();

app.set("trust proxy", process.env.TRUST_PROXY === "true" ? 1 : false);
app.disable("x-powered-by");
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    const error = new Error("Origin is not allowed by CORS.");
    error.status = 403;
    callback(error);
  },
  credentials: true,
}));
app.use(helmet());
app.use(express.json({ limit: "20kb" }));
app.use(session({
  name: SESSION_COOKIE,
  secret: SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: SESSION_COOKIE_SAME_SITE,
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE,
  },
}));
app.use("/api/admin", (_req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many sign-in attempts. Please try again later." },
});
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});
const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function isValidDateOfBirth(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) &&
    date.toISOString().slice(0, 10) === value &&
    value <= new Date().toISOString().slice(0, 10);
}

async function getAdmin(req) {
  if (!req.session.adminId) return null;
  const [rows] = await pool.execute(
    "SELECT id, email FROM admin_users WHERE id = ? AND is_active = 1",
    [req.session.adminId],
  );
  return rows[0] || null;
}

const requireAdmin = asyncHandler(async (req, res, next) => {
  const admin = await getAdmin(req);
  if (!admin) {
    res.status(401).json({ error: "Please sign in to continue." });
    return;
  }
  req.admin = admin;
  next();
});

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.get("/api/contact", asyncHandler(async (_req, res) => {
  const [rows] = await pool.execute(
    "SELECT phone, email, address FROM contact_settings WHERE id = 1",
  );
  res.json({ contact: rows[0] || { phone: null, email: null, address: null } });
}));

app.post("/api/enquiries", enquiryLimiter, asyncHandler(async (req, res) => {
  const body = req.body || {};
  const name = cleanText(body.name);
  const email = cleanText(body.email).toLowerCase();
  const phone = cleanText(body.phone);
  const gender = cleanText(body.gender);
  const service = cleanText(body.service);
  const dateOfBirth = cleanText(body.dateOfBirth);
  const address = cleanText(body.address);
  const reason = cleanText(body.reason);

  if (!name || name.length > 120 || !validEmail(email) || phone.length > 32 ||
      !/^\d{10}$/.test(phone) ||
      !GENDERS.has(gender) || !SERVICE_OPTIONS.has(service) ||
      address.length > 2000 || reason.length > 4000 ||
      !isValidDateOfBirth(dateOfBirth) || body.declarationAccepted !== true) {
    res.status(400).json({ error: "Check that required fields are valid, text fields are within their limits, and storage consent is accepted." });
    return;
  }

  const [result] = await pool.execute(
    `INSERT INTO enquiries
      (name, email, phone, gender, service, date_of_birth, address, reason, declaration_accepted)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
    [name, email, phone, gender, service, dateOfBirth, address || null, reason || null],
  );
  res.status(201).json({ id: result.insertId, message: "Your enquiry has been received." });
}));

app.post("/api/admin/login", loginLimiter, asyncHandler(async (req, res) => {
  const email = cleanText(req.body?.email).toLowerCase();
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  if (email.length > 254 || Buffer.byteLength(password, "utf8") > 72) {
    res.status(401).json({ error: "Email or password is incorrect." });
    return;
  }
  const [rows] = await pool.execute(
    "SELECT id, email, password_hash FROM admin_users WHERE email = ? AND is_active = 1",
    [email],
  );
  const admin = rows[0];
  const passwordMatches = admin ? await bcrypt.compare(password, admin.password_hash) : false;
  if (!admin || !passwordMatches) {
    res.status(401).json({ error: "Email or password is incorrect." });
    return;
  }

  await new Promise((resolve, reject) => {
    req.session.regenerate((error) => error ? reject(error) : resolve());
  });
  req.session.adminId = admin.id;
  await new Promise((resolve, reject) => {
    req.session.save((error) => error ? reject(error) : resolve());
  });
  res.json({ authenticated: true, email: admin.email });
}));

app.get("/api/admin/session", asyncHandler(async (req, res) => {
  const admin = await getAdmin(req);
  res.json(admin
    ? { authenticated: true, email: admin.email }
    : { authenticated: false });
}));

app.post("/api/admin/logout", asyncHandler(async (req, res) => {
  if (req.session) {
    await new Promise((resolve, reject) => {
      req.session.destroy((error) => error ? reject(error) : resolve());
    });
  }
  res.clearCookie(SESSION_COOKIE, {
    httpOnly: true,
    sameSite: SESSION_COOKIE_SAME_SITE,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(204).end();
}));

app.get("/api/admin/enquiries", requireAdmin, asyncHandler(async (req, res) => {
  const status = cleanText(req.query.status);
  if (status && !ENQUIRY_STATUSES.has(status)) {
    res.status(400).json({ error: "Choose a valid enquiry status." });
    return;
  }
  const page = Number(req.query.page || 1);
  if (!Number.isSafeInteger(page) || page < 1 || page > 1000000) {
    res.status(400).json({ error: "Choose a valid page number." });
    return;
  }
  const requestedSize = Number(req.query.pageSize || 10);
  const pageSize = [5, 10, 25, 50].includes(requestedSize) ? requestedSize : 10;
  const search = cleanText(req.query.search).slice(0, 100);
  const clauses = [];
  const parameters = [];
  if (status) { clauses.push("status = ?"); parameters.push(status); }
  if (search) {
    clauses.push("(name LIKE ? OR email LIKE ? OR phone LIKE ?)");
    const like = `%${search.replace(/[\\%_]/g, "\\$&")}%`;
    parameters.push(like, like, like);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const [rows] = await pool.execute(
    `SELECT id, name, email, phone, gender, service, date_of_birth AS dateOfBirth,
      address, reason, status, created_at AS createdAt
     FROM enquiries ${where}
     ORDER BY created_at DESC, id DESC
     LIMIT ? OFFSET ?`,
    [...parameters, pageSize, (page - 1) * pageSize],
  );
  const [countRows] = await pool.execute(
    `SELECT COUNT(*) AS total FROM enquiries ${where}`,
    parameters,
  );
  res.json({ enquiries: rows, total: countRows[0].total, page, pageSize });
}));

app.patch("/api/admin/enquiries/:id/status", requireAdmin, asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const status = cleanText(req.body?.status);
  if (!Number.isSafeInteger(id) || id < 1 || !ENQUIRY_STATUSES.has(status)) {
    res.status(400).json({ error: "Choose a valid enquiry and status." });
    return;
  }
  const [result] = await pool.execute(
    "UPDATE enquiries SET status = ? WHERE id = ?",
    [status, id],
  );
  if (!result.affectedRows) {
    res.status(404).json({ error: "Enquiry not found." });
    return;
  }
  res.json({ updated: true });
}));

app.delete("/api/admin/enquiries/:id", requireAdmin, asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    res.status(400).json({ error: "Choose a valid enquiry." });
    return;
  }
  const [result] = await pool.execute("DELETE FROM enquiries WHERE id = ?", [id]);
  if (!result.affectedRows) {
    res.status(404).json({ error: "Enquiry not found." });
    return;
  }
  res.status(204).end();
}));

app.get("/api/admin/dashboard", requireAdmin, asyncHandler(async (_req, res) => {
  const [[totals]] = await pool.execute(
    `SELECT COUNT(*) AS total,
      COALESCE(SUM(status = 'new'), 0) AS newCount,
      COALESCE(SUM(status = 'contacted'), 0) AS contacted,
      COALESCE(SUM(status = 'resolved'), 0) AS resolved,
      COALESCE(SUM(created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)), 0) AS last7Days
     FROM enquiries`,
  );
  const [byService] = await pool.execute(
    `SELECT service, COUNT(*) AS count FROM enquiries
     GROUP BY service ORDER BY count DESC, service LIMIT 6`,
  );
  const [recent] = await pool.execute(
    `SELECT id, name, service, status, created_at AS createdAt
     FROM enquiries ORDER BY created_at DESC, id DESC LIMIT 5`,
  );
  res.json({
    stats: {
      total: Number(totals.total),
      new: Number(totals.newCount),
      contacted: Number(totals.contacted),
      resolved: Number(totals.resolved),
      last7Days: Number(totals.last7Days),
    },
    byService: byService.map((row) => ({ service: row.service, count: Number(row.count) })),
    recent,
  });
}));

app.get("/api/admin/notifications", requireAdmin, asyncHandler(async (_req, res) => {
  const [[countRow]] = await pool.execute(
    "SELECT COUNT(*) AS unread FROM enquiries WHERE is_read = 0",
  );
  const [items] = await pool.execute(
    `SELECT id, name, service, created_at AS createdAt
     FROM enquiries WHERE is_read = 0
     ORDER BY created_at DESC, id DESC LIMIT 8`,
  );
  res.json({ unread: Number(countRow.unread), items });
}));

app.post("/api/admin/notifications/read", requireAdmin, asyncHandler(async (_req, res) => {
  await pool.execute("UPDATE enquiries SET is_read = 1 WHERE is_read = 0");
  res.status(204).end();
}));

app.get("/api/admin/contact", requireAdmin,asyncHandler(async (_req, res) => {
  const [rows] = await pool.execute(
    "SELECT phone, email, address FROM contact_settings WHERE id = 1",
  );
  res.json({ contact: rows[0] || { phone: null, email: null, address: null } });
}));

app.put("/api/admin/contact", requireAdmin, asyncHandler(async (req, res) => {
  const phone = cleanText(req.body?.phone);
  const email = cleanText(req.body?.email).toLowerCase();
  const address = cleanText(req.body?.address);
  const phoneDigits = phone.replace(/\D/g, "");
  if ((phone && (!/^\+?[\d\s().-]+$/.test(phone) || phoneDigits.length < 8 || phoneDigits.length > 15 || phone.length > 32)) ||
      (email && !validEmail(email)) || address.length > 500) {
    res.status(400).json({ error: "Enter a valid phone number and email address, or leave either field blank to use its static fallback." });
    return;
  }

  const values = {
    phone: phone || null,
    email: email || null,
    address: address || null,
  };
  await pool.execute(
    `INSERT INTO contact_settings (id, phone, email, address)
     VALUES (1, ?, ?, ?)
     ON DUPLICATE KEY UPDATE phone = VALUES(phone), email = VALUES(email), address = VALUES(address)`,
    [values.phone, values.email, values.address],
  );
  res.json({ contact: values });
}));

app.use("/api", (_req, res) => res.status(404).json({ error: "API endpoint not found." }));
app.use((error, _req, res, _next) => {
  console.error("API request failed:", error);
  if (error.status === 403) {
    res.status(403).json({ error: "This frontend origin is not allowed." });
    return;
  }
  res.status(500).json({ error: "The request could not be completed. Please try again." });
});

const server = app.listen(PORT, () => {
  console.log(`Jeevan Jyotish API listening on http://localhost:${PORT}`);
});

function shutdown() {
  server.close(async () => {
    sessionStore.close();
    await pool.end();
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
