# Backend (Upload API)

## Endpoints

- `POST /api/media` (multipart form-data, field: `file`) → uploads an image/video
  - Optional fields: `title`, `client`, `year`, `tags` (comma separated), `description`
- `GET /api/media` → list all uploaded items
- `GET /api/media/:id` → get single item
- Static files: `GET /uploads/...` → serves uploaded files

## Storage (MongoDB)

- Set `MONGODB_URI` to store media metadata in MongoDB (Atlas).
- If `MONGODB_URI` is not set, the backend stores metadata in `uploads/manifest.json`.

## Run

```powershell
cd backend
npm install
npm run dev
```

Frontend dev server can call: `http://localhost:5050/api/media`.

## Setup MongoDB Atlas

1. In Atlas, create a database user and allow your IP in “Network Access”.
2. Get your connection string from “Connect” → “Drivers”.
3. Create `backend/.env` (copy from `backend/.env.example`) and set:
   - `MONGODB_URI=...`
   - (optional) `MONGODB_DB=mausam`
4. Restart the backend.
