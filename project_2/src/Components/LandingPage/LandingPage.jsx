import React from 'react'
import './LandingPage.css'

export const LandingPage = () => {
  return (
    <div>
        <div className='topBar'>
            <div className='title'>PlotPicks</div>
            <div className='auth-container'>
                <div className='Login'>Login</div>

                <div className='SignUp'>Sign up</div>
            </div>
        </div>
        <div className='imageBackground'>
            <div className='getStartedContatiner'>
              <div className='getStarted'>
              </div>
            </div>
        </div>
        <div className='about'>This is the about</div>
    </div>
    
  )
}
