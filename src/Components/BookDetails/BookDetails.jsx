import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import './BookDetails.css'
const BookDetails = () => {
    const location = useLocation();
    const { book } = location.state; // Get the book data from state
  
    return (
        <div>
  <div className='topBar'>
    <div><Link to="/search" className='title'>PlotPicks</Link></div>
    <div className='auth-container'>
      <div className='Logout'>LOG OUT</div>
    </div>
  </div>
  
  <div className='MidBackground'>
    <div className="book-details-container">
      <div className="book-image-container">
        <img className='bookImg' src={book.thumbnail} alt={book.title} />
      </div>
      
      <div className="book-info-container">
        <h1>{book.title}</h1>
        <p><strong>Author:</strong> {book.authors}</p>
        <p><strong>Category: </strong>{book.categories}</p>
        <p className='description'><strong>Description:</strong> {book.description}</p>
      </div>
    </div>
  </div>
</div>
    );
  };
export default BookDetails