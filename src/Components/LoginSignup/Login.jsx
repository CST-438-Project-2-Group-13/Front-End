import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login logic (e.g., make an API call to validate credentials)
    if (username && password) {
      navigate('/landing'); // If login is successful, navigate to the landing page
    } else {
      alert('Please enter valid credentials');
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Sign in</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input
            type="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleLogin}>Continue</div>
      </div>
      <div className="submit-container">
        <p>
          Don't have an account?{' '}
          <span
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => navigate('/signup')}
          >
            Create one here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login