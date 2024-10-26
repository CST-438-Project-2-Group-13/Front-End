import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHandleLogout } from '../utils/handleUtil';
import './Header.css';

const Header = ({ user, showAdmin = user.roles == 'ADMIN', showWelcome = true, showSignUp = true, showSearch = true, showMyLists = true, showProfile = true }) => {
  const navigate = useNavigate();
  const [hasWishlists, setHasWishlists] = useState(false);
  const handleLogout = useHandleLogout();
  useEffect(() => {
    if (user) {
      const fetchWishlists = async () => {
        try {
          const response = await fetch(`https://wishlist-6d2453473a19.herokuapp.com/api/wishlists/user/${user.userId}`);
          const data = await response.json();
          if (data && data.length > 0) {
            setHasWishlists(true);
          } else {
            setHasWishlists(false);
          }
        } catch (error) {
          console.error('Error fetching wishlists:', error);
          setHasWishlists(false); 
        }
      };

      
      
      fetchWishlists();
    }
  }, [user]);

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
            {/*Only shows admin if user is an admin */}
            {showAdmin && (
              <div className='SearchBooks' onClick={() => navigate('/admin')}>
                <p className='SearchBooksText'>Admin</p>
              </div>
            )}

            {/*Only shows search books if user has a list */}
            {showSearch && hasWishlists && (
              <div className='SearchBooks' onClick={() => navigate('/search')}>
                <p className='SearchBooksText'>Search Books</p>
              </div>
            )}

            {!hasWishlists && (
              <p className='noListMessage'></p>
            )}

            {/* My Lists and Profile links */}
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
