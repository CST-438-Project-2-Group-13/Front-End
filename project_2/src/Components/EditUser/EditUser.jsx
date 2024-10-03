import React from 'react';
import './EditUser.css';

export const EditUser = () => {
  return (
    <div className='container'>
      <div className="header">
        <div className="text">Edit Profile</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input type="text" placeholder="First Name"/>
          <input type="text" placeholder="Last Name"/>
        </div>

        <div className="input">
          <input type="password" placeholder="Current Password"/>
        </div>
        <div className="input">
          <input type="password" placeholder="New Password"/>
        </div>
        <div className="input">
          <input type="password" placeholder="Confirm Password"/>
        </div>
      </div>
      <div className="submit-container">
        <div className="submit">Save Changes</div>
        <div className="submit delete">Delete Account</div>
      </div>
    </div>
  );
};
