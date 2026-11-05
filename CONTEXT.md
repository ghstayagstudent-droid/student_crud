# Student CRUD Application - Project Context & Implementation Plan

## 1. Project Overview & Context
This project connects a modern **Vite + React (JavaScript)** frontend to an existing **Spring Boot (Java)** REST API for managing student records.

- **GitHub Guide Repository**: `https://github.com/ghstayagstudent-droid/student_crud`
- **Deployment Target**: [Render.com](https://render.com)
- **Framework & Tooling**: Vite + React (JavaScript) + Tailwind CSS
- **Design Rule**: **NO MODALS** (Inline forms & inline row-level confirmation).

---

## 2. Render.com Deployment Configuration

### Frontend (Static Site):
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Environment Variable**: `VITE_API_URL` (points to the deployed Spring Boot backend URL, e.g. `https://student-api.onrender.com`).
- **SPA Rewrites**: `/*` -> `/index.html` (Rewrite rule).
- **Blueprint**: [`render.yaml`](file:///C:/Users/Student-00/Desktop/Tayag/JAVA/STUDENET-CRUD/client/render.yaml) provided for one-click deployment.

### Backend (Web Service / Docker):
- **CORS Support**: Added `@CrossOrigin(origins = "*")` to [`StudentController.java`](file:///C:/Users/Student-00/Desktop/Tayag/JAVA/STUDENET-CRUD/student/src/main/java/com/tayag/student/StudentController.java) to allow cross-origin requests from Render frontend.
- **Dynamic Port**: Added `server.port=${PORT:8080}` to support Render's dynamically assigned `$PORT`.
- **Database Connection**: Configured parameterized PostgreSQL properties:
  - `${SPRING_DATASOURCE_URL:jdbc:postgresql://localhost:5432/db_user}`
  - `${SPRING_DATASOURCE_USERNAME:postgres}`
  - `${SPRING_DATASOURCE_PASSWORD:admin}`
- **Containerization**: Provided multi-stage [`Dockerfile`](file:///C:/Users/Student-00/Desktop/Tayag/JAVA/STUDENET-CRUD/student/Dockerfile) for zero-config Docker deployment on Render.
