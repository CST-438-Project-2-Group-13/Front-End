import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './EditUser.css';

export const EditUser = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Update username API call
  const handleChangeUsername = async () => {
    try {
      const response = await fetch(`https://wishlist-6d2453473a19.herokuapp.com/username?username=${user.username}&newUsername=${newUsername}`, {
        method: 'PATCH',
      });

      if (response.ok) {
        alert('Username updated successfully');
        localStorage.setItem('user', JSON.stringify({ ...user, username: newUsername }));
        navigate('/');
      } else {
        alert('Failed to update username. Please check your input.');
      }
    } catch (error) {
      console.error('Error updating username:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('https://wishlist-6d2453473a19.herokuapp.com/logout', {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Update password API call
  const handleChangePassword = async () => {
    try {
      const response = await fetch(`https://wishlist-6d2453473a19.herokuapp.com/password?username=${user.username}&currentPassword=${currentPassword}&newPassword=${newPassword}`, {
        method: 'PATCH',
      });

      if (response.ok) {
        alert('Password updated successfully');
        localStorage.setItem("userPassword", newPassword);
        navigate('/');
      } else {
        alert('Failed to update password. Please check your input.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Delete account API call
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action is irreversible.');

    if (confirmed) {
      try {
        const token = localStorage.getItem("token"); // Get token
        const storedPassword = localStorage.getItem("userPassword");  // Get stored password

        // Check if entered password matches stored password
        if (currentPassword !== storedPassword) {
          alert("Password is incorrect. Please check and try again.");
          return;  // Stop the function if passwords do not match
        }

        // Make a DELETE request to the API with username, password
        const response = await fetch(`https://wishlist-6d2453473a19.herokuapp.com/users?username=${user.username}&password=${currentPassword}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,  // Use token for verification
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          alert('Account deleted successfully');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('userPassword');
          navigate('/login');
        } else {
          alert('Failed to delete account. Please check your password and try again.');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <Header 
        user={user} 
        showWelcome={false} 
        showSignUp={true} 
        showSearch={true} 
        showMyLists={true} 
        showProfile={true} 
      />
      <div className='container'>
        <div className="header">
          <div className="text">Edit Profile</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <span>Current username: {user.username}</span>
          </div>
          <div className="input">
            <input 
              type="password" 
              placeholder="Current password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="input">
            <input 
              type="text" 
              placeholder="New username" 
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <div className="input">
            <input 
              type="password" 
              placeholder="New password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="submit-container">
          <button className="submit" onClick={handleChangeUsername}>Update Username</button>
          <button className="submit" onClick={handleChangePassword}>Update Password</button>
          <button className="submit delete" onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;