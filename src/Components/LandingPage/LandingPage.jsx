import React from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';

import './LandingPage.css'

export const LandingPage = () => {
  const location = useLocation();
  localStorage.setItem("user", JSON.stringify(location.state.user));
  console.log(location.state.user);
  console.log(localStorage["token"]);
  console.log("is this defined? ", JSON.parse(localStorage.getItem("user")));
  const user = localStorage.getItem("user");
  return (
    <div>
        <div className='topBar'>
        <div><Link to="/landing" className='title'>PlotPicks</Link></div>
            <div><p>{'Welcome, ' + location.state.user.username}</p></div> 
            <div className='auth-container'>
                <div className='Login'><Link to="/login" className='LoginText'>Login</Link></div>
                
                <div className='SignUp'><Link to="/signup" className='SignUpText'>Sign Up</Link></div>
            </div>
        </div>
        <div className='imageBackground'>
            <div className='getStartedContatiner'>
              <div className='DisplayText'>
              Curate Your Dream Library, One Wish at a Time.
              </div>
              <div className='getstartedCont'>
              <div className='getStarted'>
              <div><Link to="/login" className='getStartedText'>Get Started</Link></div>
              </div>
              </div>
              
            </div>
        </div>
        <div className='aboutContainer'>
            <h1 class="about-title">Build. Add. Share.</h1>
            <div class="about-description">
              <p>Create as many wish lists, add all the books you want</p>
              <p>Add books easily from the website</p>
              <p>Share your wish list with others</p>
            </div>
          </div>
    </div>
    
  )
}

export default LandingPage