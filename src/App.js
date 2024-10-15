import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './Components/LoginSignup/Login';
import { Signup } from './Components/LoginSignup/Signup';
import { LandingPage } from './Components/LandingPage/LandingPage';
import SearchPage from './Components/SearchPage/SearchPage';
import TestPage from './Components/TestPage1/TestPage';
import BookDetails from './Components/BookDetails/BookDetails';
function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/testPage" element={<TestPage />} />
            <Route path="/book/:id" element={<BookDetails />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;