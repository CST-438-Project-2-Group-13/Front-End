import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './Components/LoginSignup/Login';
import { Signup } from './Components/LoginSignup/Signup';
import { LandingPage } from './Components/LandingPage/LandingPage';
import SearchPage from './Components/SearchPage/SearchPage';

function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/landing" element={<LandingPage />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;