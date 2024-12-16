import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./Login";
import CreateAccount from "./CreateAccount";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Admission from "./Admission";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if token exists in localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Set login state if token exists
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);  // Save token to localStorage
    setIsLoggedIn(true); // Update state to reflect login
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update state to reflect logout
  };

  return (
    <Router> {/* Wrap everything inside Router */}
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} /> {/* Pass login state and logout handler to Navbar */}
      <Routes>
        {/* Default route - Home page */}
        <Route path="/" element={<Home />} />

        {/* Login route */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Create account route */}
        <Route path="/create-account" element={<CreateAccount />} />

        {/* Dashboard route with authentication check */}
        <Route path="/dashboard" element={<DashboardWithRedirect />} />

        {/* Admission route */}
        <Route path="/admission" element={<Admission />} />
      </Routes>
    </Router>
  );
}

function DashboardWithRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return <Dashboard />; // Show the dashboard if authenticated
}

export default App;
