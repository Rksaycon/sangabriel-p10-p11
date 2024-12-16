import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateAccount() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Clear any previous error message
    setSuccess(''); // Clear any previous success message
    setLoading(true);  // Start loading

    try {
      const response = await fetch('https://finals-backend-2.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, username, password }),
      });

      if (!response.ok) throw new Error('Failed to create account');

      const result = await response.json();
      setSuccess('Account created successfully! Redirecting to homepage.....');
      
      // Redirect after 2 seconds to avoid confusing the user
      setTimeout(() => navigate('/'), 2000); 
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);  // End loading
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ height: "100vh", width: "100vw", backgroundColor: "#f8f9fa", margin: 0 }}
    >
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Create Account</h3>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
          
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">Full Name</label>
            <input
              type="text"
              id="fullname"
              className="form-control"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

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

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account?{' '}
            <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              Login
            </span>
          </small>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
