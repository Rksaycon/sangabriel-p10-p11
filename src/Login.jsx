import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Clear any previous error message
    setSuccess(''); // Clear any previous success message

    try {
      const response = await fetch('https://backend-p10-p11-sangabriel.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Invalid credentials');

      const result = await response.json();
      // Assuming the backend returns a token on successful login
      localStorage.setItem('token', result.token);

      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 2000); // Redirect to dashboard after 2 seconds
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw', backgroundColor: '#f8f9fa' }}>
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Login</h3>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <small>
            Don't have an account?{' '}
            <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/create-account')}>
              Sign Up
            </span>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
