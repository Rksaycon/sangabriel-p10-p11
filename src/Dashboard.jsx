import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editFullname, setEditFullname] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login if no token
    }

    fetchUsers(); // Fetch the users when the component is mounted
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://backend-p10-p11-sangabriel.onrender.com/api/users', {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data); // Set the users state
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please try again later.');
    }
  };

  const handleDeleteUser = async (user_id) => {
    try {
      const response = await fetch(`https://backend-p10-p11-sangabriel.onrender.com/api/users/${user_id}
`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // After deletion, re-fetch the users list
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://backend-p10-p11-sangabriel.onrender.com/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      setSuccess('User created successfully!');
      setFullname('');
      setUsername('');
      setPassword('');

      // After creating a user, re-fetch the users list
      fetchUsers();
      setShowCreateForm(false); // Close the form
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to create user. Please try again.');
    }
  };

  const handleReadUser = (id) => {
    const user = users.find((user) => user.user_id === id);
    if (user) {
      setSelectedUser(user); // Set the selected user to display in modal
    }
  };

  const handleUpdateUser = (id) => {
    const user = users.find((user) => user.user_id === id);
    if (user) {
      setEditingUser(id);
      setEditFullname(user.fullname);
      setEditUsername(user.username);
      setEditPassword('');
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`https://backend-p10-p11-sangabriel.onrender.com/api/users/${editingUser}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname: editFullname,
          username: editUsername,
          password: editPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      setSuccess('User updated successfully!');

      // After updating, re-fetch the users list
      fetchUsers();

      // Reset editing state
      setEditingUser(null);
      setEditFullname('');
      setEditUsername('');
      setEditPassword('');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to update user. Please try again.');
    }
  };

  const closeModal = () => {
    setSelectedUser(null); // Close the modal by resetting the selected user
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start"
      style={{
        height: "100vh",  // Full height of the viewport
        width: "100vw",
        backgroundColor: "#e9ecef",
        paddingTop: "20px",  // Optional: space at the top if needed
      }}
    >
      <div className="container mt-5">
        <h2>Dashboard</h2>
        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Cancel' : 'Add New User'}
        </button>
  
        {showCreateForm && (
          <div className="card p-4 mb-4">
            <h4>Create User</h4>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <form onSubmit={handleCreateUser}>
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">
                  Full Name
                </label>
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
                <label htmlFor="username" className="form-label">
                  Username
                </label>
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
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create User
              </button>
            </form>
          </div>
        )}
  
        {editingUser && (
          <div className="card p-4 mb-4">
            <h4>Edit User</h4>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <form onSubmit={handleSubmitUpdate}>
              <div className="mb-3">
                <label htmlFor="editFullname" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="editFullname"
                  className="form-control"
                  value={editFullname}
                  onChange={(e) => setEditFullname(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editUsername" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="editUsername"
                  className="form-control"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="editPassword"
                  className="form-control"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update User
              </button>
            </form>
            <button
              className="btn btn-secondary mt-3"
              onClick={() => setEditingUser(null)}
            >
              Close
            </button>
          </div>
        )}
  
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.fullname}</td>
                <td>{user.username}</td>
                <td className="actions">
                  <button
                    className="btn btn-info me-2"
                    onClick={() => handleReadUser(user.user_id)}
                  >
                    Read
                  </button>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleUpdateUser(user.user_id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user.user_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Modal for reading user details */}
        {selectedUser && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              height: '100vh',
              width: '100vw',
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 1050,
              backgroundColor: 'rgba(   0, 0, 0, 0.5)',
            }}
            onClick={closeModal}
          >
            <div
              className="card p-4"
              style={{
                backgroundColor: 'white',
                width: '400px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h4>User Details</h4>
              <p><strong>ID:</strong> {selectedUser.user_id}</p>
              <p><strong>Full Name:</strong> {selectedUser.fullname}</p>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <button className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

