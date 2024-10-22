import React from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';

import './LandingPage.css'
import NavBar from '../NavBar/NavBar';

export const LandingPage = () => {
  const location = useLocation();
  if(location.state != null){
    localStorage.setItem("user", JSON.stringify(location.state.user));
  }
  
  //console.log("Is this defined? ", JSON.parse(localStorage.getItem("user")));
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(localStorage.getItem("user")) : null;
  return (
    <div>
      <NavBar/>
        <div className='topBar'>
        <div><Link to="/landing" className='title'>PlotPicks</Link></div>
          <div>
            {user ? <p>{'Welcome, ' + user.username}</p> : <p>Welcome, Guest!</p>} 
          </div>  
            <div className='auth-container'>
                <div className='Login'><Link to="/login" className='LoginText'>Login</Link></div>
                
                <div className='SignUp'><Link to="/signup" className='SignUpText'>Sign Up</Link></div>
            </div>
        </div>
        <div className='imageBackground'>
            <div className='getStartedContatiner'>
              <div className='DisplayText'>
              <p>Curate your dream library,</p>
              <p>one wish at a time.</p>
              </div>
              <div className='getstartedCont'>
              <div className='getStarted'>
              <div><Link to={localStorage['token'] ? "/ListPage" : "/login" }className='getStartedText'>Get Started</Link></div>
              </div>
              </div>
              
            </div>
        </div>
        <div className='aboutContainer'>
            <h1 class="about-title">Build. Add. Share.</h1>
            <div class="about-description">
              <p>Search books, create lists</p>
              <p>Share your wishlists with others</p>
            </div>
          </div>
    </div>
    
  )
}

export default LandingPage