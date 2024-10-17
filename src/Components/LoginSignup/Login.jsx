import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`https://wishlist-6d2453473a19.herokuapp.com/login?username=${username}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);  // Log error status
      }
  
      const data = await response.text();  // Use response.text() to handle plain text
      console.log('Login successful:', data);  // Log success
      if (data === "Login successful!") {
        navigate('/'); // Redirect to landing page after successful login
      } else {
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);  // Log detailed error
      alert('Login failed. Please check your credentials and try again.');  // Provide user feedback
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
            type="text"
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
