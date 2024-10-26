import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LandingPage.css';
import Header from '../Header/Header';

export const LandingPage = () => {
  const navigate = useNavigate();

  // Retrieve user from localStorage
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div>
      {/* Use the Header component with props */}
      <Header 
        user={user} 
        showWelcome={true} 
        showSignUp={true} 
        showSearch={true} 
        showMyLists={true} 
        showProfile={true} 
      />

      <div className='imageBackground'>
        <div className='getStartedContainer'>
          <div className='DisplayText'>
            <p>Curate your dream library,</p>
            <p>one wish at a time.</p>
          </div>
          <div className='getstartedCont'>
            <div className='getStarted'>
              <div>
                <Link to={user ? "/ListPage" : "/login"} className='getStartedText'>Get Started</Link>
              </div>
            </div>
          </div>
          {/* {user && (
            <div className="button-container">
              <div className="small-button" onClick={() => navigate('/search')}>
                <p className="small-button-text">Search books</p>
              </div>
              <div className="small-button" onClick={() => navigate('/editProfile')}>
                <p className="small-button-text">Edit Profile</p>
              </div>
            </div>
          )} */}
        </div>
      </div>
      <div className='aboutContainer'>
          <h1 class="about-title">Build. Add. Organize.</h1>
          <div class="about-description">
            <p>Search Books And Create Lists</p>
            </div>
      </div>
    </div>
  );
};

export default LandingPage;