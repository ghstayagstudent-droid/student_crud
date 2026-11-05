# Student CRUD Application - Project Context & Implementation Plan

## 1. Project Overview & Context
This project connects a modern **Vite + React (JavaScript)** frontend to an existing **Spring Boot (Java)** REST API for managing student records.

### Constraints & Preferences
- **Framework & Tooling**: Vite + React (JavaScript)
- **Styling**: Tailwind CSS
- **Design Rule**: **NO MODALS**.
  - **Form interaction**: An inline/card-based form (split layout) for Create and Edit operations.
  - **Delete confirmation**: Inline row-level confirmation (`Delete? [Yes] [Cancel]`) directly within table cells.
- **Status**: **Completed & Verified (Build passing)**.

### Backend Details (`student/`)
- **Framework**: Spring Boot with Spring Data JPA & PostgreSQL
- **Default Port**: `8080`
- **Base Endpoint**: `/tayag/students`
- **Entity Fields**: `id`, `firstname`, `lastname`, `course`, `section`

#### REST Endpoints:
| Method | Endpoint | Request Body | Description |
|---|---|---|---|
| `GET` | `/tayag/students` | None | Retrieves all student records |
| `GET` | `/tayag/students/{id}` | None | Retrieves single student by ID |
| `POST` | `/tayag/students` | `{ firstname, lastname, course, section }` | Creates a new student record |
| `PUT` | `/tayag/students/{id}` | `{ firstname, lastname, course, section }` | Updates an existing student |
| `DELETE` | `/tayag/students/{id}` | None | Deletes student by ID |

---

## 2. Implemented Architecture

### Directory Structure
```text
STUDENET-CRUD/
├── student/                     # Spring Boot Backend
├── client/                      # Vite + React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Header with total count & refresh sync button
│   │   │   ├── AlertBanner.jsx  # In-page success/error notifications (No modals)
│   │   │   ├── StudentForm.jsx  # In-page dual-mode form (Add & Edit)
│   │   │   └── StudentTable.jsx # Table with live search filter & inline delete confirmation
│   │   ├── services/
│   │   │   └── studentApi.js    # Clean fetch API client for /tayag/students
│   │   ├── App.jsx              # Central reactive state & layout
│   │   ├── index.css            # Tailwind CSS directives
│   │   └── main.jsx
│   ├── vite.config.js           # Configured with proxy to http://localhost:8080
│   └── package.json
├── CONTEXT.md                   # Preserved context & specification
└── README.md                    # Startup & guide documentation
```

### CORS & Proxy Strategy
Configured in `client/vite.config.js`:
```javascript
server: {
  port: 5173,
  proxy: {
    '/tayag': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }
  }
}
```

---

## 3. Completed Implementation Phases

- [x] **Phase 1: Project Scaffolding & Tailwind Installation**
  - Vite React JavaScript app created in `client/`.
  - Installed Tailwind CSS v4 and `@tailwindcss/vite` plugin.
  - Configured `vite.config.js` with proxy to Spring Boot on `localhost:8080`.
- [x] **Phase 2: API Service Layer**
  - Created `client/src/services/studentApi.js` implementing all 5 CRUD operations.
- [x] **Phase 3: Component Architecture (No Modals)**
  - Built `StudentForm.jsx` (inline card supporting both Add and Edit modes).
  - Built `StudentTable.jsx` (search filter + inline row-level delete confirmation prompt).
  - Built `AlertBanner.jsx` (in-page feedback alerts).
  - Built `Navbar.jsx` (header with sync button and live count badge).
- [x] **Phase 4: State Management & Wiring**
  - Integrated state in `App.jsx` for seamless CRUD lifecycle, validation, and auto-scroll to edit mode.
- [x] **Phase 5: Build Verification**
  - Tested production build with `npm run build` in `client/` (passed with zero errors).
