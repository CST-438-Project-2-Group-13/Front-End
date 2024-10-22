import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();

  // Log out function passed directly into the Log Out button
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("Logged out");
    navigate("/login");
  };

  return (
    <nav className='navbar'>
      <div className='navbar-logo'>
        <Link to="/" className='navbar-title'>PlotPicks</Link>
      </div>
      <div className='navbar-links'>
        <Link to="/ListPage" className='navbar-item'>My Lists</Link>
        <Link to="/search" className='navbar-item'>Search</Link>
        <button onClick={handleLogout} className='navbar-item logout-button'>Log Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
