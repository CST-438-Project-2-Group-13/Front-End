import React from 'react'
import { useNavigate, Link} from 'react-router-dom';
import './LandingPage.css'

export const LandingPage = () => {
  return (
    <div>
        <div className='topBar'>
        <div><Link to="/" className='title'>PlotPicks</Link></div>
            <div className='auth-container'>
                <div className='Login'><Link to="/login" className='LoginText'>Log In</Link></div>
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
              <div><Link to="/login" className='getStartedText'>Get Started</Link></div>
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