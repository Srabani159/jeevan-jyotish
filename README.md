# Jeevan Jyotish

The project is split into two independently runnable applications:

- `frontend/` — React 19 and Vite website, admin UI, and API client.
- `backend/` — Node.js and Express API, MySQL migrations, and admin seeder.

The frontend talks to the API through `/api`. In development, Vite proxies those
requests to the backend on port `3001`. In production, set `VITE_API_BASE_URL`
and configure the backend CORS origin for the frontend deployment.

## Requirements

- Node.js 20 or newer and npm.
- MySQL 8 or a compatible MySQL server.

## Local setup

Run these commands from the repository root in PowerShell.

1. Install both workspace applications:

   ```powershell
   npm install
   ```

2. Create local environment files:

   ```powershell
   Copy-Item backend\.env.example backend\.env
   Copy-Item frontend\.env.example frontend\.env
   ```

3. Create a MySQL database if it does not already exist:

   ```powershell
   mysql -u root -p -e "CREATE DATABASE jeevan_jyotish CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   ```

4. Edit `backend\.env` and set the database connection, a unique
   `SESSION_SECRET` (at least 32 characters), `ADMIN_EMAIL`, and a unique
   `ADMIN_PASSWORD` (at least 12 characters and no more than 72 UTF-8 bytes).
   The example values are
   placeholders, not usable credentials. Keep `.env` files private; they are
   ignored by Git.

   Generate a session secret with:

   ```powershell
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ```

5. Apply the MySQL schema:

   ```powershell
   npm run db:migrate
   ```

6. Create or update the administrator account. The seeder reads credentials
   from `backend\.env` and stores only a bcrypt password hash:

   ```powershell
   npm run db:seed:admin
   ```

7. Start the API and frontend in separate terminals:

   ```powershell
   npm run dev:api
   ```

   ```powershell
   npm run dev
   ```

   Open the Vite URL (usually `http://localhost:5173`). The admin panel is at
   `/admin`. Sign in with the values configured in `backend\.env`.

## Workspace commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the frontend Vite server |
| `npm run dev:api` | Start the API with Node watch mode |
| `npm run start:api` | Start the API without watch mode |
| `npm run build` | Build the frontend for production |
| `npm run db:migrate` | Apply pending SQL migrations |
| `npm run db:seed:admin` | Seed/reset admin credentials from environment |

You can also run scripts inside one workspace, for example
`npm run build --workspace frontend` or
`npm run db:migrate --workspace backend`.

## Admin and enquiry behavior

- The appointment form posts to the API and creates an enquiry in MySQL.
- The form asks for explicit consent to store all current fields. This includes
  name, email, phone, gender, service, date of birth, and any optional address
  or consultation reason.
- Only an authenticated administrator can read enquiry details. Admin sign-in
  uses an HTTP-only session cookie backed by the MySQL `admin_sessions` table.
- Admins can filter enquiries by status (`new`, `contacted`, `resolved`), update
  a status, or permanently delete an enquiry.
- Enquiries are not automatically expired. Define an appropriate retention
  period and use the admin delete action to remove records that are no longer
  needed; include database backups in your data-retention policy.
- Admins can edit the public phone, email, and address at `/admin`. Leaving a
  field blank clears its database value so the frontend uses its static
  fallback.
- Static contact fallbacks are `+91-7008259050`,
  `acharyajayantji@gmail.com`, and `New Amalipali, Sundargarh, 770001, Odisha`.
  The shared header, footer, appointment page, service pages, shop, and home
  page use database values when present and fall back per field otherwise.
- Branch-specific appointment contact numbers and the website developer
  contact in the footer remain separate from the shared public contact settings.

## API

The backend is a standalone JSON API in `backend/`. API requests accept and
return JSON; admin routes require the session cookie created by login.

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Public | API health check |
| `GET` | `/api/contact` | Public | Read configured public contact details |
| `POST` | `/api/enquiries` | Public, rate-limited | Submit an appointment enquiry |
| `POST` | `/api/admin/login` | Public, rate-limited | Sign in |
| `GET` | `/api/admin/session` | Public | Check the current admin session |
| `POST` | `/api/admin/logout` | Public | Sign out |
| `GET` | `/api/admin/enquiries` | Admin | List enquiries; supports `page` and optional `status` |
| `PATCH` | `/api/admin/enquiries/:id/status` | Admin | Change enquiry status |
| `DELETE` | `/api/admin/enquiries/:id` | Admin | Permanently delete an enquiry |
| `GET` | `/api/admin/contact` | Admin | Read editable contact settings |
| `PUT` | `/api/admin/contact` | Admin | Save contact settings |

The frontend API base defaults to `/api`; set `VITE_API_BASE_URL` in
`frontend\.env` if the API is hosted at another URL. The local Vite proxy
forwards `/api` without the browser `Origin` header, so it works regardless
of which local port Vite selects. Set backend `CORS_ORIGINS` to the exact
frontend origin(s), comma-separated, when browsers call the API directly.
For a cross-site frontend/API deployment, configure HTTPS, use
`SESSION_COOKIE_SAME_SITE=none`, and keep `NODE_ENV=production` so cookies are
Secure. Set `TRUST_PROXY=true` only when the API is behind a trusted reverse
proxy.

## Database

`backend/migrations/001_initial_schema.sql` creates:

- `admin_users` — admin email and password hash.
- `contact_settings` — optional dynamic phone, email, and address.
- `enquiries` — appointment request details and status.
- `admin_sessions` — server-side admin sessions.

The migration runner tracks applied SQL files in `schema_migrations`. Add future
schema changes as new, ordered SQL files in `backend/migrations/`; do not edit
an already-applied migration.
