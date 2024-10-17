import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch('https://wishlist-6d2453473a19.herokuapp.com/newuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, roles: 'USER' }),
      });
    
      if (!response.ok) {
        throw new Error(`Signup failed: ${response.statusText}`);  // Log error status
      }
    
      const data = await response.json();
      console.log('Signup successful:', data);  // Log success
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      console.error('Error during signup:', error);  // Log detailed error
      alert('Signup failed. Please try again.');  // Provide user feedback
    }
  };  

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Create an account</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleSignup}>Sign Up</div>
      </div>
      <div className="submit-container">
        <p>
          Already have an account?{' '}
          <span
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};
