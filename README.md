# Password Manager

A password manager with a React/Vite frontend and a Node.js/Express API. The
API stores user accounts and password entries in MongoDB.

## Requirements

- Node.js 20 or newer and npm
- MongoDB (local or hosted)

## Local development

### API

If `backend/.env` does not already exist, create it from the example. Set
`MONGO_URI` to your MongoDB connection string and `JWT_SECRET` to a long,
random secret:

```sh
cd backend
cp .env.example .env
npm install
npm run dev
```

The API listens on port `5000` by default. For local frontend development, the
example CORS origin (`http://localhost:5173`) is already configured. Set
`clientID` if you use Google sign-in.

### Frontend

If `frontend/.env` does not already exist, create it from the example. In
another terminal:

```sh
cd frontend
cp .env.example .env
npm install
npm run dev
```

Vite serves the frontend at `http://localhost:5173`. `VITE_API_URL` should be
the API base URL; it defaults to `http://localhost:5000`. Set
`VITE_GOOGLE_CLIENT_ID` to the same OAuth client ID as the backend's `clientID`
to enable Google sign-in.

To create and preview a production build:

```sh
npm run build
npm run preview
```

Run those commands from `frontend`.

## Deploying the frontend to Vercel

Import the repository into Vercel and set **Root Directory** to `frontend`.
Vercel should detect Vite; the build command is `npm run build` and the output
directory is `dist`. The `frontend/vercel.json` rewrite supports direct
navigation and refreshes on frontend routes such as `/login` and `/signup`.

Deploy the Express API separately to a Node.js host with network access to
MongoDB. Set the following environment variables in the respective services:

- **Vercel:** `VITE_API_URL` to the deployed API's public base URL and
  `VITE_GOOGLE_CLIENT_ID` if using Google sign-in. Redeploy after changing them.
- **API host:** `MONGO_URI`, `JWT_SECRET`, and `FRONTEND_ORIGIN` to the deployed
  database connection, a long random secret, and the exact Vercel frontend
  origin. Also set `clientID` if using Google sign-in.

For cross-site cookie authentication, set `COOKIE_SAME_SITE=none` and
`COOKIE_SECURE=true` on the API host; the API must use HTTPS. Browsers can block
third-party cookies, so frontend and API hostnames under the same custom domain
are more reliable. See `backend/.env.example` and `frontend/.env.example` for
local development values.

## API routes

- `POST /register`
- `POST /login`
- `POST /googleLogin`
- `POST /createPass`
- `GET /userData`
- `GET /checkAuth`
- `GET /logout`
