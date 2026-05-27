# SAGEC AI Asset Hub

> The structured content system that feeds Manus AI everything it needs in one request — eliminating usage limit problems.

---

## Problem Solved

Your friend was giving Manus a Google Drive link as the trusted source, and Manus was trying to crawl the whole drive. That caused usage-limit hits before the flyer could be generated.

## How This Fix Works

Instead of sending Manus a Drive link, this project creates a single API-backed gallery hub. Manus fetches one trusted URL and receives:

- company info
- brand colors and logos
- approved image URLs
- service descriptions
- daily flyer instructions
- ready-to-use captions and hashtags

This prevents Manus from crawling Google Drive and exhausting usage limits.

## What This Is

Instead of Manus crawling Google Drive (burning through usage limits), it now hits **one URL** and gets everything: company info, services, brand colors, image URLs, captions, and daily instructions.

---

## Project Structure

```
sagec-hub/
├── backend/          ← Express API (deploy to Render)
│   ├── server.js     ← All data + all endpoints live here
│   ├── package.json
│   └── render.yaml
└── frontend/         ← React dashboard (deploy to Netlify/GitHub Pages)
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   └── pages/
    └── package.json
```

---

## Step 1 — Deploy the Backend (Render)

1. Push the `backend/` folder to a GitHub repo
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free
5. Deploy → copy your URL (e.g. `https://sagec-asset-hub-api.onrender.com`)
> New: You can now manage gallery images from the frontend `Gallery` tab. It uploads directly to Cloudinary, shows category filters, and lets you delete assets.
---

## Step 2 — Update the Frontend with Your Render URL

Open `frontend/src/pages/ApiPage.jsx` and update line 1:

```js
const BASE_URL = 'https://YOUR-RENDER-URL.onrender.com'
```

---

## Step 3 — Add Real Images via Cloudinary

1. Log in to [cloudinary.com](https://cloudinary.com)
2. Create folders: `sagec/architecture`, `sagec/interior-design`, `sagec/construction`, etc.
3. Upload **5–15 high quality images** per folder
4. Copy each image's delivery URL
5. Open `backend/server.js` and replace all `"REPLACE_WITH_CLOUDINARY_URL"` placeholders with real URLs

> Also add Cloudinary credentials to `backend/.env`:
> `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`

**Also update the logo URLs:**
```js
logo: {
  main: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/sagec/logo-main.png",
  transparent: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/sagec/logo-transparent.png",
  white: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/sagec/logo-white.png",
}
```

---

## Step 4 — Deploy the Frontend (Netlify)

1. Push `frontend/` to GitHub
2. Go to [netlify.com](https://netlify.com) → New Site → Import from GitHub
3. Settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. Deploy → get your dashboard URL

---

## Step 5 — Keep Render Awake (Critical!)

Render free plan sleeps after 15 min inactivity. If Manus hits a sleeping server at 7 AM, it wastes actions waiting.

1. Go to [uptimerobot.com](https://uptimerobot.com) → Free account
2. Add Monitor → HTTP(s) → URL: `https://YOUR-RENDER-URL.onrender.com/`
3. Interval: **every 5 minutes**
4. Done — server never sleeps

---

## Step 6 — Set Up Manus

Give Manus **this exact prompt** (copy from the API page in the dashboard):

```
You are a professional flyer designer for SAGEC Ltd (Architectural and Engineering Solutions), based in Kigali, Rwanda.

TRUSTED SOURCE (use ONLY this — do not browse other websites):
https://YOUR-RENDER-URL.onrender.com/api/ai-context

DAILY INSTRUCTIONS:
1. First, fetch: https://YOUR-RENDER-URL.onrender.com/api/today-prompt
2. Then fetch: https://YOUR-RENDER-URL.onrender.com/api/ai-context
3. Generate ONE unique professional marketing flyer based on today's focus.
4. Use ONLY images and assets from the API response.
5. Always include: SAGEC logo, phone (+250 788 470 243), email (sagecltd@gmail.com).
6. Apply brand colors: Primary Orange #F15A22, Navy #1B3A6B.
7. Do NOT repeat flyer styles from previous days.
8. After the flyer, generate a matching caption and hashtags.

SCHEDULE: Run this task every day at 07:00 AM (Kigali time, UTC+2).
```

---

## API Endpoints

| Endpoint | Purpose |
|---|---|
| `GET /api/ai-context` | **Master endpoint** — give this to Manus |
| `GET /api/today-prompt` | Daily generation instructions |
| `GET /api/services` | All 8 services |
| `GET /api/services/:id` | Single service by ID |
| `GET /api/captions?service=id` | Captions & hashtags |
| `GET /api/brand` | Brand guidelines |

---

## Weekly Maintenance (5 minutes every Monday)

1. Open the dashboard
2. Go to **Weekly Focus** tab
3. Change the service focus and theme for the week
4. Update `server.js` accordingly and redeploy backend

---

## Adding a Second Company Later

1. Duplicate `server.js` → rename to `server-company2.js`
2. Replace all SAGEC data with the new company's data
3. Deploy as a separate Render service
4. Done — same system, new company

---

## Brand Colors

| Color | Hex | Usage |
|---|---|---|
| Primary Orange | `#F15A22` | Main accent, CTAs, logo |
| Dark Navy | `#1B3A6B` | Secondary, backgrounds |
| Steel Gray | `#8A9BA8` | Subtle accents |
| White | `#FFFFFF` | Text on dark |

---

Built for SAGEC Ltd — Kigali, Rwanda 🇷🇼
