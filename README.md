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

