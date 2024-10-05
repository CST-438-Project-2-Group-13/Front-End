import React from 'react'
import './LoginSignup.css'
export const Login = () => {
  return (
    <div className='container'>
        <div className="header">
            <div className="text">Login</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <input type="email" placeholder='Enter Email'/>
            </div>

            <div className="input">
                <input type="password" placeholder='Enter Password'/>
            </div>
        </div>
        <div className="submit-container">
            <div className="submit">Log in</div>
        </div>
    </div>
  )
}

export default Login