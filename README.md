# Student Management System (CRUD)

A full-stack Student CRUD application combining a **Spring Boot** REST backend with a modern **Vite + React (JavaScript)** frontend styled with **Tailwind CSS**.

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
│   │   │   └── studentApi.js        # REST client (/tayag/students)
│   │   ├── App.jsx                  # Main application state & reactive layout
│   │   ├── index.css                # Tailwind CSS v4 entry
│   │   └── main.jsx
│   ├── vite.config.js               # Dev server proxy (/tayag -> localhost:8080)
│   └── package.json
├── student/                 # Spring Boot Backend (Java 17+, PostgreSQL)
│   ├── src/main/java/com/tayag/student/
│   │   ├── Student.java             # Entity model (id, firstname, lastname, course, section)
│   │   ├── StudentController.java   # REST controller (/tayag/students)
│   │   └── StudentRepository.java   # Spring Data JPA Repository
│   └── src/main/resources/application.properties
├── CONTEXT.md               # Context documentation and architecture roadmap
└── README.md                # Project startup & usage instructions
```

---

## 🚀 How to Run the Application

### 1. Start PostgreSQL & Backend (Spring Boot)
Ensure PostgreSQL is running locally with database `db_user` (credentials configured in `student/src/main/resources/application.properties`).

Open a terminal and run:
```powershell
cd student
.\mvnw.cmd spring-boot:run
```
The backend starts at `http://localhost:8080`.

### 2. Start Frontend (Vite + React)
Open a second terminal and run:
```powershell
cd client
npm run dev
```
The frontend dev server starts at `http://localhost:5173`.

Vite is pre-configured with a reverse proxy in `vite.config.js` to seamlessly route `/tayag` requests to `http://localhost:8080`.

---

## 🎯 Key Features

- **Vite + React (JavaScript)**: Fast HMR, clean component architecture, and lightweight client.
- **Tailwind CSS**: Sleek, responsive design with clear typography, badges, and focus indicators.
- **Zero Modals**:
  - **Add / Edit Mode**: Managed via an in-page sticky card form. Clicking "Edit" populates the form and reveals a "Cancel Edit" button.
  - **Inline Delete Confirmation**: Clicking "Delete" turns the row action cell into an inline `"Delete? [Yes] [Cancel]"` prompt without interrupting popups.
- **Real-time Search Filter**: Instant client-side filtering by name, course, section, or student ID.
- **In-page Alert Notifications**: Dynamic banners for instant feedback on success or connection errors.
