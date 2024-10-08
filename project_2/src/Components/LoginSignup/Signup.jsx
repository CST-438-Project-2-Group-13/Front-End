import React, {useState} from 'react'
import './LoginSignup.css'

export const LoginSignup = () => {
  return (
    <div className='container'>
        <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <input type="text" placeholder='Enter a Username'/>
            </div>
            
            <div className="input">
                <input type="email" placeholder='Enter Email'/>
            </div>

            <div className="input">
                <input type="password" placeholder='Enter Password'/>
            </div>
        </div>
        <div className="submit-container">
            <div className="submit">Sign Up</div>
        </div>
    </div>
  )
}
