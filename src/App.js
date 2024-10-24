import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from './Components/LandingPage/LandingPage';
import { Login } from './Components/LoginSignup/Login';
import { Signup } from './Components/LoginSignup/Signup';
import SearchPage from './Components/SearchPage/SearchPage';
import TestPage from './Components/TestPage1/TestPage';
import BookDetails from './Components/BookDetails/BookDetails';
import ListPage from './Components/ListPage/ListPage';
import NewListPage from './Components/NewList/NewListPage';
import EditUser from './Components/EditUser/EditUser';
import BLBookDetails from './Components/BookDetails/BLBookDetails';
function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/testPage" element={<TestPage />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/ListPage" element={<ListPage />} />
            <Route path="/newList" element={<NewListPage />} />
            <Route path="/editProfile" element={<EditUser />} />
            <Route path="/blbookdetails/:title" element={<BLBookDetails />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;