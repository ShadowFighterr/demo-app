# Startup Frontend Demo (React, frontend-only)

This folder contains a minimal React + Vite frontend demo implementing:
- client-side mock authentication (no backend)
- protected routes (React Router)
- a small demo resource (Notes) stored in localStorage

## Run locally

1. Ensure Node.js (16+) and npm are installed.
2. From the `frontend/` folder:
   ```bash
   npm install
   npm run dev
   ```
3. Open the URL shown by Vite (usually http://localhost:5173)

## What I implemented
- `AuthContext` — provides `signup`, `login`, `logout`, and `user` state.
- `PrivateRoute` — wrapper to protect pages.
- `DemoResource` — create/read/delete notes stored locally to demonstrate app flow.
- Simple, responsive styling (no external CSS frameworks).

## Next steps
- Replace mock auth with Firebase or a real backend (swap `AuthContext` and use `api.js`).
- Add form validation and nicer UI/UX.



## UI improvements added
- Material UI (MUI) components for forms and layout.
- react-hook-form for form validation on Login, Signup, and Profile pages.
