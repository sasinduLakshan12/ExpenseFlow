# 💰 ExpenseFlow – Expense & Budget Tracker

**Software Engineering Team 405 – Individual Assignment**  
**Project Deadline:** October 16, 2026, at 3:00 PM (Sri Lanka Time)  

ExpenseFlow is a modern full-stack web application designed for personal finance management, expense tracking, and monthly budget planning.

---

## 🛠️ Technology Stack

* **Frontend:** React.js, Vite, Tailwind CSS (v4), React Router DOM (v7), Lucide Icons, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose (ODM)
* **Security & Auth:** JWT (JSON Web Tokens), bcrypt.js (Day 2)
* **Version Control:** Git & GitHub

---

## 📁 Project Structure

```text
Expense & Budget Tracker/
├── client/                 # React Frontend App (Vite)
│   ├── src/
│   │   ├── components/     # Navbar & Shared UI Components
│   │   ├── pages/          # Dashboard, Login, Register, Transactions, Budgets
│   │   ├── App.jsx         # Router & Route Config
│   │   └── main.jsx        # App Mount Point
│   └── package.json
├── server/                 # Express Backend API App
│   ├── config/             # DB Connection (db.js)
│   ├── models/             # Mongoose Schemas (User, Transaction, Budget)
│   ├── server.js           # Server Entrypoint
│   └── package.json
├── implementation_plan.md  # Architectural Roadmap & Schedule
└── README.md               # Documentation
```

---

## 🚀 Getting Started & Setup Instructions

### Prerequisites
* **Node.js:** v18+ installed
* **MongoDB:** Local MongoDB server running on `mongodb://127.0.0.1:27017`

### 1. Backend Setup
```bash
cd server
npm install
npm run dev
```
Backend runs on: `http://localhost:5000`

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 📅 Daily Progress Log

- [x] **Day 1 (Oct 09, 2026)**: Architecture planning, Vite + React + Tailwind + React Router setup, Express backend initialization, MongoDB + Mongoose Schemas setup, Initial Git repository structure.
- [ ] **Day 2 (Oct 10, 2026)**: User Registration, Login, JWT Authentication & Protected Routes.
- [ ] **Day 3 (Oct 11, 2026)**: Income & Expense CRUD operations & Transaction Forms.
- [ ] **Day 4 (Oct 12, 2026)**: Dashboard overview & Total Calculations, Search & Filter functionality.
- [ ] **Day 5 (Oct 13, 2026)**: Monthly Budget manager & Chart visualizer.
- [ ] **Day 6 (Oct 14, 2026)**: Responsive UI polish, Validation & Bug fixes.
- [ ] **Day 7 (Oct 15, 2026)**: Final testing, Screenshots, GitHub polish, Demo Video recording.
- [ ] **Day 8 (Oct 16, 2026)**: Submission before 3:00 PM.
