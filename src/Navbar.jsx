import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Custom styles

function Navbar({ isLoggedIn, onLogout }) {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand custom-brand" to="/">Welcome to Your Personal Dashboard</Link> {/* Updated brand name */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto custom-nav-links">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link> {/* Updated to admin dashboard route */}
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/admission">How to?</Link>
            </li>
            {!token ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="nav-link custom-logout-btn"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();  // Remove token and reload
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
