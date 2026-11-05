# Student Management System (CRUD)

A full-stack Student CRUD application combining a **Spring Boot** REST backend with a modern **Vite + React (JavaScript)** frontend styled with **Tailwind CSS**.

Repository guide: [https://github.com/ghstayagstudent-droid/student_crud](https://github.com/ghstayagstudent-droid/student_crud)

---

## 📁 Repository Structure

```text
STUDENET-CRUD/
├── client/                  # Vite + React Frontend (JavaScript + Tailwind CSS)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Top header with sync status & record count
│   │   │   ├── AlertBanner.jsx      # In-page success/error notifications (No modals)
│   │   │   ├── StudentForm.jsx      # In-page dual-mode form (Add / Edit)
│   │   │   └── StudentTable.jsx     # Searchable directory with inline delete confirmation
│   │   ├── services/
│   │   │   └── studentApi.js        # REST client (/tayag/students + VITE_API_URL support)
│   │   ├── App.jsx                  # Main application state & reactive layout
│   │   ├── index.css                # Tailwind CSS v4 entry
│   │   └── main.jsx
│   ├── render.yaml                  # Render Blueprint definition for one-click deploy
│   ├── .env.example                 # Example environment variable (VITE_API_URL)
│   ├── vite.config.js               # Dev server proxy (/tayag -> localhost:8080)
│   └── package.json
├── student/                 # Spring Boot Backend (Java 17+, PostgreSQL)
│   ├── src/main/java/com/tayag/student/
│   │   ├── Student.java             # Entity model (id, firstname, lastname, course, section)
│   │   ├── StudentController.java   # REST controller with @CrossOrigin for cloud deploy
│   │   └── StudentRepository.java   # Spring Data JPA Repository
│   ├── Dockerfile                   # Multi-stage Dockerfile for Render Web Service
│   └── src/main/resources/application.properties
├── CONTEXT.md               # Context documentation and architecture roadmap
└── README.md                # Project startup & deployment instructions
```

---

## 🌐 Deploying on Render.com

### Part 1: Deploy Frontend (`client`) as a Static Site
1. Go to [dashboard.render.com](https://dashboard.render.com/) -> **New +** -> **Static Site**.
2. Connect `https://github.com/ghstayagstudent-droid/student_crud`.
3. Configure settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Set Environment Variables:
   - **`VITE_API_URL`**: `https://<your-backend-api>.onrender.com` (leave empty for local proxy).
5. In **Redirects / Rewrites**, add:
   - **Type**: `Rewrite` | **Source**: `/*` | **Destination**: `/index.html`
6. Click **Create Static Site**.

---

### Part 2: Deploy Backend (`student`) as a Web Service (Docker)
1. In Render Dashboard, click **New +** -> **PostgreSQL** to create a free PostgreSQL instance.
2. Click **New +** -> **Web Service**, select repository, and choose **Docker**.
3. Set Environment Variables:
   - `PORT`: `8080`
   - `SPRING_DATASOURCE_URL`: `jdbc:postgresql://<render-db-host>:<port>/<db_name>`
   - `SPRING_DATASOURCE_USERNAME`: `<username>`
   - `SPRING_DATASOURCE_PASSWORD`: `<password>`
4. Copy your backend service URL and paste it into `VITE_API_URL` on your frontend static site.

---

## 💻 Local Development

### 1. Start PostgreSQL & Backend (Spring Boot)
```powershell
cd student
.\mvnw.cmd spring-boot:run
```
*(Runs at `http://localhost:8080`)*

### 2. Start Frontend (Vite + React)
```powershell
cd client
npm run dev
```
*(Runs at `http://localhost:5173`)*
