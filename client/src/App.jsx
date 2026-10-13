import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';

// Dynamic Home Route: Shows Landing page if guest, Dashboard if logged in
const HomeRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-slate-400 font-medium">Loading ExpenseFlow...</p>
        </div>
      </div>
    );
  }

  return user ? <Dashboard /> : <Landing />;
};

// Redirect logged-in users away from Login and Register
const PublicAuthRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            <Routes>
              {/* Home Route (Landing for guests, Dashboard for users) */}
              <Route path="/" element={<HomeRoute />} />

              {/* Public Auth Routes */}
              <Route
                path="/login"
                element={
                  <PublicAuthRoute>
                    <Login />
                  </PublicAuthRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicAuthRoute>
                    <Register />
                  </PublicAuthRoute>
                }
              />

              {/* Protected Routes (Require Authentication) */}
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <Transactions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/budgets"
                element={
                  <ProtectedRoute>
                    <Budgets />
                  </ProtectedRoute>
                }
              />

              {/* Fallback Catch-all Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
