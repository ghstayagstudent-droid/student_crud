# Student Management System (CRUD)

A full-stack Student CRUD application combining a **Spring Boot** REST backend with a modern **Vite + React (JavaScript)** frontend styled with **Tailwind CSS**.

Repository: [https://github.com/ghstayagstudent-droid/student_crud](https://github.com/ghstayagstudent-droid/student_crud)

---

## 🚀 Deployment Guide on Render.com

This repository is configured to support two deployment approaches on **[Render.com](https://render.com/)**:
1. **Method A: 1-Click Automated Blueprint (`render.yaml`)** *(Recommended)*
2. **Method B: Manual Service Setup**

---

### Method A: Automated 1-Click Blueprint (Recommended)

The included [`render.yaml`](./render.yaml) automatically provisions all 3 required services and connects them together:
- 🐘 **PostgreSQL Database** (`student-db`)
- ☕ **Spring Boot Backend** (`student-backend`)
- ⚛️ **Vite + React Frontend** (`student-frontend`)

#### Steps:
1. Log in to [dashboard.render.com](https://dashboard.render.com/).
2. In the top navigation, click **"Blueprints"** &rarr; **"New Blueprint Instance"**.
3. Connect your repository:
   ```text
   https://github.com/ghstayagstudent-droid/student_crud
   ```
4. Render will read [`render.yaml`](./render.yaml), display the 3 services, and auto-populate their environment variables.
5. Click **"Apply"**. Render will deploy the database, compile the backend Docker container, build the frontend, and link the frontend's `VITE_API_URL` automatically.

---

### Method B: Manual Service Setup on Render

If you prefer setting up the services individually:

#### 1. Database (PostgreSQL)
- Click **"New +"** &rarr; **"PostgreSQL"**.
- Name: `student-db` | Database: `db_user` | User: `postgres`.
- Copy the **Internal Database URL** once provisioned.

#### 2. Backend Web Service (Spring Boot)
- Click **"New +"** &rarr; **"Web Service"** &rarr; Select repository.
- **Root Directory**: `student`
- **Environment**: `Docker` *(Render auto-detects `student/Dockerfile`)*
- **Environment Variables**:
  - `PORT`: `8080`
  - `SPRING_DATASOURCE_URL`: `jdbc:postgresql://<internal-db-host>:5432/db_user`
  - `SPRING_DATASOURCE_USERNAME`: `<db-user>`
  - `SPRING_DATASOURCE_PASSWORD`: `<db-password>`
- Copy your deployed backend service URL (e.g., `https://student-backend.onrender.com`).

#### 3. Frontend Static Site (Vite + React)
- Click **"New +"** &rarr; **"Static Site"** &rarr; Select repository.
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: `https://student-backend.onrender.com` *(your backend URL without trailing slash)*
- **Redirects / Rewrites** tab:
  - Add Rule: **Type**: `Rewrite` | **Source**: `/*` | **Destination**: `/index.html`
- Click **"Create Static Site"**.

---

## 💻 Local Development

### 1. Start PostgreSQL & Spring Boot Backend
Ensure local PostgreSQL is running with database `db_user`.
```powershell
cd student
.\mvnw.cmd spring-boot:run
```
*(Backend runs at `http://localhost:8080`)*

### 2. Start Vite React Frontend
```powershell
cd client
npm run dev
```
*(Frontend runs at `http://localhost:5173`)*
