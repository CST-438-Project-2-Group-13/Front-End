import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ user, handleLogout, showWelcome = true, showSignUp = true, showSearch = true, showMyLists = true, showProfile = true }) => {
  const navigate = useNavigate();
  
  return (
    <div className='topBar'>
      <div><Link to="/" className='title'>PlotPicks</Link></div>

      {/* Conditionally render the welcome message */}
      {showWelcome && (
        <div>
          {user ? <p>{'Welcome, ' + user.username}</p> : <p>Welcome, Guest!</p>}
        </div>
      )}

      <div className='auth-container'>
        {user ? (
          <>
            {/* Conditionally render the Search Books, My Lists, Profile options based on props */}
            {showSearch && (
              <div className='SearchBooks' onClick={() => navigate('/search')}>
                <p className='SearchBooksText'>Search Books</p>
              </div>
            )}
            {showMyLists && (
              <div className='MyLists' onClick={() => navigate('/list')}>
                <p className='MyListText'>My Lists</p>
              </div>
            )}
            {showProfile && (
              <div className='MyProfile' onClick={() => navigate('/editProfile')}>
                <p className='MyProfileText'>Profile</p>
              </div>
            )}
            <div className='Login' onClick={handleLogout}>
              <p className='LoginText'>Log Out</p>
            </div>
          </>
        ) : (
          <>
            <div className='Login'><Link to="/login" className='LoginText'>Login</Link></div>

            {/* Conditionally render the Sign Up link */}
            {showSignUp && (
              <div className='SignUp'><Link to="/signup" className='SignUpText'>Sign Up</Link></div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;