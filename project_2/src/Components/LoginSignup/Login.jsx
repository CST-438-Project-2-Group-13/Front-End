import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login logic (e.g., make an API call to validate credentials)
    if (email && password) {
      navigate('/landing'); // If login is successful, navigate to the landing page
    } else {
      alert('Please enter valid credentials');
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleLogin}>Log in</div>
      </div>
      <div className="submit-container">
        <p>
          Don't have an account?{' '}
          <span
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};
