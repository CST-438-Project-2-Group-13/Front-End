import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewListPage.css';
import Header from '../Header/Header';

const NewListPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage['user']); // Get current user details
  const userId = user.userId;

  const handleCreateList = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://wishlist-6d2453473a19.herokuapp.com/api/wishlists?name=${title}&description=${description}&userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });

      if (response.ok) {
        // If successful, navigate back to the list page
        navigate('/list');
      } else {
        console.error('Error creating wishlist');
      }
    } catch (error) {
      console.error('Error:', error);
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
    <div className='new-list-container'>
      <h2>Create a New Wishlist</h2>
      <form onSubmit={handleCreateList}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='createButton'>Create Wishlist</button>
      </form>
    </div>
    </div>
  );
};

export default NewListPage;
