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
        throw new Error(`Login failed: ${response.statusText}`);
      }
  
      const token = await response.text();
  
      if (token !== "Login failed. Check your credentials.") {
        localStorage.setItem("token", token);  // Save the token
        localStorage.setItem("userPassword", password);
        console.log("Token:", token);
        console.log("Password:", password);
  
        // Fetch protected data
        const user = await fetchProtectedData();
        console.log("user after /protected", user);

        if (user) {
          console.log("User:", user);
          localStorage.setItem("user", JSON.stringify(user));  // Save user data to localStorage
          navigate('/', { state: { user } });
        } else {
          alert('Login failed. Please check your credentials and try again.');
        }
      } else {
        alert('Login failed. Check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  const fetchProtectedData = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("https://wishlist-6d2453473a19.herokuapp.com/protected", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch protected data:', response.statusText);
      return null;
    }

    const text = await response.text(); // Get raw text response
    try {
      const user = JSON.parse(text); // Try to parse as JSON
      
      if (user && (Object.keys(user).length > 0)) {
        return user;
      } else {
        return {};
      }
    } catch (error) {
      console.error('Error parsing JSON:', error, 'Response text:', text);
      return null; // Return null if JSON parsing fails
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
