import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (username && email && password) {
      try {
        const response = await fetch('https://wishlist-6d2453473a19.herokuapp.com/new-user?username=test&password=test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
          alert('User created successfully!');
          navigate('/');
        } else {
          alert('Failed to create user');
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input
            type="text"
            placeholder="Enter a Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div className="submit" onClick={handleSignup}>Sign Up</div>
      </div>
      <div className="submit-container">
        <p>
          Already have an account?{' '}
          <span
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};