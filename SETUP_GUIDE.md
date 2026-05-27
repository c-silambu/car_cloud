# 🚀 Gold Medal Automotive - Cloud Hosting Guide

## Overview
- **Frontend (React)** → Deploy to Vercel (free)
- **Backend (Flask)** → Deploy to Render (free)
- **Database (PostgreSQL)** → Supabase (free)

---

## Step 1: Setup PostgreSQL on Supabase (Free)

1. Go to https://supabase.com → Sign up free
2. Click **"New Project"** → Give a name → Set password → Click Create
3. Wait ~2 mins for it to start
4. Go to **Settings → Database → Connection String → URI**
5. Copy the URI — looks like:
   `postgresql://postgres:[YOUR-PASSWORD]@db.xxxx.supabase.co:5432/postgres`
6. **Save this** — you'll need it in Step 2

---

## Step 2: Deploy Backend on Render (Free)

1. Push your code to GitHub (just the project folder)
2. Go to https://render.com → Sign up → **New → Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app_api:app`
   - **Environment:** Python 3
5. Add **Environment Variables** (click "Add Env Var"):
   ```
   DATABASE_URL    = (paste your Supabase URI from Step 1)
   SECRET_KEY      = (generate: python -c "import secrets; print(secrets.token_hex(32))")
   ALLOWED_ORIGINS = https://your-app.vercel.app  ← fill after Step 3
   ADMIN_USER      = admin
   ADMIN_PASS      = your_strong_password
   ```
6. Click **Deploy** → Wait ~3 mins
7. Copy your Render URL (e.g. `https://gold-medal-api.onrender.com`)

---

## Step 3: Deploy Frontend on Vercel (Free)

1. Go to https://vercel.com → Sign up → **New Project**
2. Import your GitHub repo
3. Add **Environment Variable**:
   ```
   VITE_API_BASE = https://gold-medal-api.onrender.com  ← your Render URL from Step 2
   ```
4. Click **Deploy** → Wait ~1 min
5. Copy your Vercel URL (e.g. `https://gold-medal.vercel.app`)

---

## Step 4: Update CORS in Render

1. Go back to Render → Your backend service → **Environment**
2. Update `ALLOWED_ORIGINS` to your Vercel URL:
   ```
   ALLOWED_ORIGINS = https://gold-medal.vercel.app
   ```
3. Click **Save** → Render auto-redeploys

---

## ✅ Done! 
- Admin: `https://gold-medal.vercel.app` → login with your ADMIN_USER/ADMIN_PASS
- Driver: same URL → Driver Login tab
- User: same URL → Register/Login
- **Data is shared across ALL devices** ✅

---

## Local Development (testing on your PC)

### Backend:
```bash
pip install -r requirements.txt
# No DATABASE_URL needed — uses SQLite automatically
python app_api.py
```

### Frontend:
```bash
npm install
npm run dev
# No VITE_API_BASE needed — Vite proxy handles /api → localhost:5000
```
