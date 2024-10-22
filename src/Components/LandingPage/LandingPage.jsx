import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LandingPage.css';

export const LandingPage = () => {
  const navigate = useNavigate();

  // Retrieve user from localStorage
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = async () => {
    try {
      await fetch('https://wishlist-6d2453473a19.herokuapp.com/logout', {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.removeItem('user'); // Remove user data
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <div className='topBar'>
        <div><Link to="/" className='title'>PlotPicks</Link></div>
        <div>
          {user ? <p>{'Welcome, ' + user.username}</p> : <p>Welcome, Guest!</p>}
        </div>
        <div className='auth-container'>
          {user ? (
            <div className='Login' onClick={handleLogout}>
              <p className='LoginText'>Log Out</p>
            </div>
          ) : (
            <>
              <div className='Login'><Link to="/login" className='LoginText'>Login</Link></div>
              <div className='SignUp'><Link to="/signup" className='SignUpText'>Sign Up</Link></div>
            </>
          )}
        </div>
      </div>
      <div className='imageBackground'>
        <div className='getStartedContainer'>
          <div className='DisplayText'>
            <p>Curate your dream library,</p>
            <p>one wish at a time.</p>
          </div>
          <div className='getstartedCont'>
            <div className='getStarted'>
              <div><Link to={user ? "/ListPage" : "/login"} className='getStartedText'>Get Started</Link></div>
            </div>
          </div>
          {user && (
            <div className="button-container">
              <div className="small-button" onClick={() => navigate('/search')}>
                <p className="small-button-text">Search books</p>
              </div>
              <div className="small-button" onClick={() => navigate('/editProfile')}>
                <p className="small-button-text">Edit Profile</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;