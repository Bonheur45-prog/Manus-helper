# Render Deployment Guide

## Prerequisites
1. Render account (sign up at https://render.com)
2. GitHub account with your repo pushed
3. Cloudinary account credentials
4. MongoDB Atlas cluster and connection string

## Step 1: Connect Render to Your GitHub Repo

1. Go to [https://dashboard.render.com](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Select "Deploy an existing repository" and connect your GitHub account
4. Find `Manus-Helper` repo and select it
5. Name the service: `sagec-asset-hub-api`
6. Root Directory: `backend`
7. Runtime: `Node`
8. Build Command: `npm install`
9. Start Command: `node server.js`

## Step 2: Set Environment Variables for Backend

In the Render dashboard for the backend service, add these environment variables:

```
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
MONGODB_URI=<your_mongodb_connection_string>
MONGODB_DB=sagec-hub
```

**Where to get these:**
- Cloudinary: Your `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` are in your local `.env` file
- MongoDB: Your `MONGODB_URI` is in your local `.env` file

## Step 3: Deploy Frontend (Static Site)

1. In Render dashboard, click "New +" → "Static Site"
2. Connect the same GitHub repo
3. Name: `sagec-asset-hub-ui`
4. Root Directory: `frontend`
5. Build Command: `npm install && npm run build`
6. Publish Directory: `dist`

## Step 4: Connect Frontend to Backend API

After the frontend deploys, add environment variable:

```
VITE_API_URL=https://sagec-asset-hub-api.onrender.com
```

(Replace with your actual backend URL from Render dashboard)

## Step 5: Redeploy Frontend

Once the backend URL is set in `VITE_API_URL`, redeploy the frontend so it knows where to fetch from.

## Alternative: Using render.yaml

If you prefer automated deployment from the repo root, the root `render.yaml` file defines both services. Push it to your repo and Render will auto-detect the configuration.

## Testing After Deployment

1. Visit your frontend URL: `https://sagec-asset-hub-ui.onrender.com`
2. Navigate to the Gallery and Company Profile pages
3. Test uploading an image
4. Check the browser console for any API errors

If you see API errors, verify:
- Backend environment variables are correctly set
- MongoDB connection string is valid
- Cloudinary credentials are correct
- Frontend has correct `VITE_API_URL` pointing to your backend

## Troubleshooting

**Backend won't start:**
- Check Render logs for error messages
- Verify all environment variables are set
- Ensure MongoDB Atlas cluster allows Render's IP (whitelist: allow all 0.0.0.0/0 or add Render IP)

**Frontend can't reach backend:**
- Verify `VITE_API_URL` is correct and points to live backend
- Check browser Network tab to see actual API call URLs
- Ensure backend CORS is configured to allow frontend domain

**Cloudinary uploads fail:**
- Verify `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` are correct
- Check Cloudinary dashboard to ensure the credentials are active

