import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from './assets/pic.jpg';
import './Home.css';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero d-flex justify-content-start align-items-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          height: '100vh',
          color: 'white',
          textAlign: 'left',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw',
        }}
      >
        <div
          style={{
            maxWidth: '50vw',
            paddingLeft: '5vw',
          }}
        >
          <h1>Welcome to Your Personal Dashboard</h1>
          <p>Manage your account and stay organized.</p>
          <Link to="/login" className="btn btn-primary btn-lg">
            Login
          </Link>
          <br />
          <Link to="/create-account" className="btn btn-secondary btn-lg">
            Create Account
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section className="container py-5" style={{ width: '90vw', margin: '0 auto' }}>
        <h2 className="text-center mb-4">What is This Platform?</h2>
        <p className="text-center">
          This platform helps you manage your personal data, view your dashboard, and stay organized. Create an account to get started!
        </p>
      </section>

      {/* User Dashboard Section */}
      <section className="container py-5" style={{ backgroundColor: '#f8f9fa', width: '90vw', margin: '0 auto' }}>
        <h2 className="text-center mb-4">Your Dashboard</h2>
        <div className="text-center">
          <p>Welcome back, <strong>[User Name]</strong>!</p>
          <p>This is your personal space where you can manage your data, settings, and more.</p>
          <Link to="/logout" className="btn btn-danger btn-lg">Logout</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4" style={{ backgroundColor: '#343a40', color: '#fff' }}>
        <p>&copy; 2024 Simple User Dashboard | All Rights Reserved</p>
        <div>
          <Link to="/facebook" className="text-white mx-2">Facebook</Link>
          <Link to="/twitter" className="text-white mx-2">Twitter</Link>
          <Link to="/linkedin" className="text-white mx-2">LinkedIn</Link>
        </div>
      </footer>
    </div>
  );
}

export default Home;
