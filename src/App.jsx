"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import AdminDashboard from "./pages/Dashboard"
import "./index.css"

const ProtectedRoute = ({ children }) => {
  const username = sessionStorage.getItem("username")

  // If not authenticated, auto-login for testing
  if (!username) {
    // Auto-login for testing - remove this in production
    sessionStorage.setItem("username", "admin")
    sessionStorage.setItem("role", "admin")
    sessionStorage.setItem("email", "admin@example.com")
  }

  return children
}

function App() {
  // Auto-set authentication on mount
  useEffect(() => {
    if (!sessionStorage.getItem("username")) {
      sessionStorage.setItem("username", "admin")
      sessionStorage.setItem("role", "admin")
      sessionStorage.setItem("email", "admin@example.com")
    }
  }, [])

  return (
    <Router>
      <Routes>
        {/* Default route always goes to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard/admin" replace />} />

        <Route path="/dashboard" element={<Navigate to="/dashboard/admin" replace />} />

        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Add your other routes here */}
        <Route path="/dashboard/assign-task" element={
          <ProtectedRoute>
            {/* Your assign task component */}
            <div>Assign Task Page</div>
          </ProtectedRoute>
        } />

        {/* Catch-all route redirects to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard/admin" replace />} />
      </Routes>
    </Router>
  )
}

export default App