# Deploying to Vercel

This directory is the Vite frontend. In Vercel, import the repository and set
**Root Directory** to `frontend`. Vercel should detect Vite automatically; use
`npm run build` as the build command and `dist` as the output directory.

The rewrite in `vercel.json` sends client-side routes such as `/login` and
`/signup` back to the app so refreshing those pages works.

The Express API in `../backend` is a separate, long-running Node.js service and
is not deployed by this Vercel frontend project. Deploy it to a Node.js host
with MongoDB access, then add these variables in Vercel's project settings:

- `VITE_API_URL`: the public base URL of the deployed API (no trailing slash)
- `VITE_GOOGLE_CLIENT_ID`: the Google OAuth client ID, if Google sign-in is used

Set the API host's `FRONTEND_ORIGIN` to the exact production frontend origin.
For cookie-based login across different sites, configure `COOKIE_SAME_SITE=none`
and `COOKIE_SECURE=true`; production cookies require HTTPS. Browsers may block
third-party cookies, so using frontend and API hostnames under the same custom
domain is more reliable. The API also needs its MongoDB URI and JWT secret set
in that host's environment. Set `clientID` there too if Google sign-in is used.

After changing Vercel environment variables, redeploy so Vite includes them in
the frontend build. For local development, create `.env` from `.env.example`.
