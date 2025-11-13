# Role-based Auth Mini Project

A simple full-stack app with role-based signup/login and a protected dashboard.

## Tech Stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs
- Frontend: React (Vite), react-router-dom
- Deployment targets: Render (backend) and Netlify (frontend)

## Project Structure
```
backend/
  src/
    lib/db.js
    models/User.js
    middleware/auth.js
    routes/auth.js
    index.js
  package.json
  .env.example
frontend/
  src/
    components/ProtectedRoute.jsx
    lib/api.js
    lib/auth.js
    pages/{Login,Signup,Dashboard}.jsx
    App.jsx
    main.jsx
  index.html
  vite.config.js
  netlify.toml
  package.json
  .env.example
```

## Running locally
1. Backend
   - Copy `backend/.env.example` to `backend/.env` and fill values.
   - Install deps and start dev server:
     - `npm install`
     - `npm run dev`
   - Default: http://localhost:4000

2. Frontend
   - Copy `frontend/.env.example` to `frontend/.env` and adjust API URL if needed.
   - Install deps and run dev:
     - `npm install`
     - `npm run dev`
   - Default: http://localhost:5173

## API Endpoints
- POST /auth/signup -> { token }
- POST /auth/login -> { token }
- GET /auth/me (Bearer token) -> { user }

## Deployment
- Backend (Render):
  - Create a new Web Service from the `backend` folder repo.
  - Runtime: Node. Build command: `npm install`. Start command: `npm start`.
  - Environment: set `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGIN` (e.g., your Netlify site URL).

- Frontend (Netlify):
  - Connect repo, choose `frontend` as base directory.
  - Build command: `npm run build`. Publish: `dist`.
  - Add environment variable `VITE_API_BASE_URL` pointing to your Render backend URL.

## Notes
- Passwords are hashed with bcryptjs.
- JWT is stored in localStorage for simplicity. In production, consider HTTP-only cookies.
- Dashboard header shows role-specific text as required.
