# Student CRUD Application - Frontend (Vite + React)

A modern, responsive Student Management application built with **Vite**, **React**, and **Tailwind CSS**, designed with **zero modals** (in-page form & inline row-level confirmation).

---

## 🚀 Render.com Deployment Guide

This repository is ready for direct deployment on **[Render.com](https://render.com/)** as a **Static Site**.

### Step 1: Create a Static Site on Render
1. Log in to [dashboard.render.com](https://dashboard.render.com/).
2. Click the **"New +"** button in the top navigation and select **"Static Site"**.
3. Connect your GitHub repository:
   ```text
   https://github.com/ghstayagstudent-droid/student_crud
   ```

### Step 2: Configure Build Settings
Fill in the following build parameters:

| Setting | Value |
|---|---|
| **Name** | `student-crud` *(or your preferred name)* |
| **Branch** | `main` |
| **Build Command** | `npm run build` |
| **Publish Directory** | `dist` |

### Step 3: Add Environment Variables
Under the **Environment Variables** section, add:

| Key | Value | Notes |
|---|---|---|
| `VITE_API_URL` | `https://your-backend-api.onrender.com` | Your deployed Spring Boot backend URL (no trailing slash) |

> 💡 **Note**: In local development (`npm run dev`), `VITE_API_URL` can be left blank; Vite automatically proxies requests through `vite.config.js` to `http://localhost:8080`.

### Step 4: Add SPA Rewrite Rule
To support clean browser routing without 404s on refresh:
1. In the left sidebar of your static site on Render, go to **Redirects / Rewrites**.
2. Click **Add Rule** and enter:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
3. Click **Save Changes**.

### Step 5: Deploy
Click **"Create Static Site"** (or **"Manual Deploy"**). Render will run `npm run build` and publish the site in seconds.

---

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Dev Server
```bash
npm run dev
```
The frontend starts at `http://localhost:5173` and proxies `/tayag` requests to your local Spring Boot backend at `http://localhost:8080`.

### 3. Production Build Test
```bash
npm run build
```
Generates production-optimized assets into the `dist/` folder.
