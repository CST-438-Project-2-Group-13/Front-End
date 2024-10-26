import React from 'react';
import './EditUser.css';
import { useNavigate, Link} from 'react-router-dom';
import Header from '../Header/Header';
export const EditUser = () => {

  const user = JSON.parse(localStorage['user']);
  const navigate = useNavigate();

  const handleSaveChanges = () => {
    // Logic for saving changes
  };

  const handleDeleteAccount = () => {
    // Logic for deleting account
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
          <input type="text" placeholder="Current username"/>
        </div>
        <div className="input">
          <input type="password" placeholder="Current password"/>
        </div>
        <div className="input">
          <input type="text" placeholder="New username"/>
        </div>
        <div className="input">
          <input type="password" placeholder="New password"/>
        </div>
      </div>
      <div className="submit-container">
        <button className="submit" onClick={handleSaveChanges}>Confirm Changes</button>
        <button className="submit delete" onClick={handleDeleteAccount}>Delete Account</button>
      </div>
      </div>
     
    </div>
  );
};

export default EditUser;