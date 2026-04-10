# 🏠 Estata — Buyer Portal

A full-stack real estate buyer portal with JWT auth and a favourites system.

---

## Tech Stack

| Layer    | Choice                                      |
|----------|---------------------------------------------|
| Backend  | Node.js + Express                           |
| Auth     | JWT (Bearer tokens) + bcryptjs (pw hashing) |
| Database | lowdb (JSON file-backed, zero native deps)  |
| Frontend | Vanilla HTML/CSS/JS (SPA, no framework)     |

---

## How to Run

### Prerequisites
- Node.js ≥ 16

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

The `.env` file is already included with defaults for local dev:

```
PORT=3001
JWT_SECRET=super_secret_key_change_in_production_12345
JWT_EXPIRES_IN=7d
```

> ⚠️ Change `JWT_SECRET` to a strong random value in production.

### 3. Start the server

```bash
node server.js
```

The server serves both the API and the frontend:

```
🏠 Buyer Portal API running on http://localhost:3001
   Frontend:  http://localhost:3001
   API:       http://localhost:3001/api/health
```

Open **http://localhost:3001** in your browser.

---

## Example Flows

### Sign Up → Login → Add Favourite

1. **Open** `http://localhost:3001`
2. Click **"Create Account"** tab
3. Fill in name, email, password (min 6 chars) → click **Create Account**
4. You're auto-logged in and land on the dashboard
5. Browse the properties grid
6. Click **♡ Save** on any property card → it's added to your favourites
7. Click **"My Favourites"** nav button to see only saved properties
8. Click **♥ Saved** again to remove it from favourites

### Login as existing user

1. Click **"Sign In"** tab
2. Enter credentials → **Sign In**
3. Your saved favourites persist across sessions

### Sign Out

Click **Sign Out** in the top-right. Your token is cleared from localStorage.

---

## API Endpoints

### Auth
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login |
| `GET`  | `/api/auth/me` | Get current user (auth required) |

### Properties
| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/properties` | List all properties (auth required) |
| `GET`  | `/api/properties/:id` | Get single property (auth required) |

### Favourites
| Method   | Path | Description |
|----------|------|-------------|
| `GET`    | `/api/favourites` | Get your favourites (auth required) |
| `POST`   | `/api/favourites/:propertyId` | Add to favourites |
| `DELETE` | `/api/favourites/:propertyId` | Remove from favourites |

All protected routes require `Authorization: Bearer <token>` header.

---

## Security Notes

- Passwords are hashed with **bcryptjs** (salt rounds: 10) — raw passwords never stored
- JWT tokens expire after 7 days
- Favourites endpoint enforces ownership — users can only read/modify their own data
- Input validation via `express-validator` on all auth endpoints
- CORS enabled (lock `origin` to your domain in production)

---

## Project Structure

```
buyer-portal/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── routes/
│   │   ├── auth.js          # Register, login, /me
│   │   ├── favourites.js    # CRUD favourites
│   │   └── properties.js    # List/get properties
│   ├── utils/
│   │   └── uuid.js          # UUID generator
│   ├── db.js                # lowdb setup + seed data
│   ├── server.js            # Express app entry point
│   ├── .env                 # Environment config
│   └── package.json
└── frontend/
    └── public/
        └── index.html       # SPA (auth + dashboard)
```

---

## DB Schema (lowdb / JSON)

```json
{
  "users": [
    { "id": "uuid", "name": "...", "email": "...", "password": "<bcrypt>", "role": "buyer", "createdAt": "..." }
  ],
  "favourites": [
    { "userId": "uuid", "propertyId": "prop_001", "addedAt": "..." }
  ],
  "properties": [
    { "id": "prop_001", "title": "...", "address": "...", "price": 0, "bedrooms": 0, ... }
  ]
}
```

Ownership enforcement: every favourites query filters by `userId: req.user.id` derived from the verified JWT — users physically cannot access other users' data.
