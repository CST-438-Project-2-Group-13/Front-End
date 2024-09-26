import React, {useState} from 'react'
import './LoginSignup.css'

export const LoginSignup = () => {

    const [action, setAction] = useState("Sign Up");

  return (
    <div className='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {action ==="Login"?<div></div>: 
            <div className="input">
                <input type="text" placeholder='Enter a Username'/>
            </div>}
            

            <div className="input">
                <input type="email" placeholder='Enter Email'/>
            </div>

            <div className="input">
                <input type="password" placeholder='Enter Password'/>
            </div>
        </div>
        <div className="submit-container">
            <div className={action ==="Login"?"submit gray": "submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action === "Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Log in</div>
        </div>
    </div>
  )
}
