# 💰 ExpenseFlow – Personal Expense & Budget Tracker

ExpenseFlow is a modern, intuitive full-stack financial management web application built with the MERN stack (MongoDB, Express, React, Node.js). It empowers users to monitor their daily expenses, track income streams, categorize financial transactions, and maintain complete visibility over their personal finances.

---

## ✨ Features

* **Secure Authentication:** User registration and login powered by bcrypt password hashing and JSON Web Tokens (JWT).
* **Income & Expense Management:** Seamlessly record, edit, view, and delete financial records.
* **Smart Categorization:** Automatically categorize transactions into predefined spending categories (Food & Dining, Utilities, Entertainment, Salary, Freelance, etc.).
* **Real-Time Search & Filtering:** Filter transactions instantly by type (Income vs Expense), category, or search keywords without page reloads.
* **Modern Fintech UI:** Sleek, responsive interface built with Tailwind CSS, Lucide icons, and a streamlined fintech design aesthetic.
* **Sri Lankan Rupee (LKR) Formatting:** Standardized localized currency and date formatting.
* **Budget Planning & Analytics:** Monthly budget allocations and category-wise spending visualizer.

---

## 🛠️ Technology Stack

### Frontend
* **Library / Framework:** React 19, Vite
* **Styling:** Tailwind CSS, PostCSS
* **Icons:** Lucide React
* **Routing:** React Router DOM (v7)
* **HTTP Client:** Axios (with automated JWT Bearer interceptor)

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **Authentication & Security:** JSON Web Token (JWT), bcryptjs, CORS

---

## 📁 Project Architecture

```text
ExpenseFlow/
├── client/                 # React Frontend (Vite + Tailwind CSS)
│   ├── public/             # Static Assets & Icons
│   ├── src/
│   │   ├── components/     # Reusable UI (Navbar, Modals, ProtectedRoute)
│   │   ├── context/        # State Management (AuthContext)
│   │   ├── pages/          # Views (Landing, Login, Register, Transactions, Dashboard, Budgets)
│   │   ├── services/       # API Services (api client, transactionService)
│   │   ├── utils/          # Helper utilities & formatters (LKR currency, dates)
│   │   ├── App.jsx         # App Root & Client-side Routing
│   │   └── main.jsx        # App Mount Point
│   └── package.json
├── server/                 # Express Backend API
│   ├── config/             # Database connection (db.js)
│   ├── controllers/        # Request Handlers (authController, transactionController)
│   ├── middleware/         # Security & JWT verification (authMiddleware)
│   ├── models/             # Mongoose Schemas (User, Transaction, Budget)
│   ├── routes/             # API Route Definitions (authRoutes, transactionRoutes)
│   ├── server.js           # Express Server Entrypoint
│   └── package.json
└── README.md               # Project Documentation
```

---

## 🚀 Getting Started & Setup Instructions

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.x or later)
* [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas connection URI

### 1. Backend Setup
1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Express development server:
   ```bash
   npm run dev
   ```
   *The backend API runs on `http://localhost:5000`.*

### 2. Frontend Setup
1. In a new terminal, navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend client runs on `http://localhost:5173`.*

---

## 🔒 API Endpoints

### Authentication
* `POST /api/auth/register` - Register a new user account
* `POST /api/auth/login` - Authenticate user & issue JWT token
* `GET /api/auth/me` - Fetch currently authenticated user profile (Protected)

### Transactions
* `GET /api/transactions` - Retrieve user's transactions with optional filters (Protected)
* `POST /api/transactions` - Create a new income or expense record (Protected)
* `PUT /api/transactions/:id` - Update an existing transaction (Protected)
* `DELETE /api/transactions/:id` - Remove a transaction (Protected)

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
