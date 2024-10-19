
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './BookDetails.css'
const BookDetails = () => {
    const location = useLocation();
    const { book } = location.state; // Get the book data from state
    const wishlistId = 1;
    const [message, setMessage] = useState('');

    const addToWishlist = async () => {
    try {
      const response = await fetch('https://arcane-fjord-82861-16172c6a1cca.herokuapp.com/https://wishlist-6d2453473a19.herokuapp.com/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: book.title,
          authors: book.authors,
          description: book.description,
          pageCount: book.pageCount,
          categories: book.categories,
          thumbnail: book.thumbnail,
          smallThumbnail: book.smallThumbnail,
        }),
      });
      console.log("this works");
      console.log("response",response);
      if (!response.ok) {
        console.log('Failed to add book to books table');
        throw new Error('Failed to add book to books table');        
      } else {
        console.log("book added successfully to table");
      }
      console.log("response",response);
      const addedBook = await response.json(); 
      console.log("addedBook", addedBook);
      const bookId = addedBook.id; 
     
      const wishlistResponse = await fetch(`https://arcane-fjord-82861-16172c6a1cca.herokuapp.com/https://wishlist-6d2453473a19.herokuapp.com/api/wishlists/${wishlistId}/books/${bookId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!wishlistResponse.ok) {
        console.log("failed to add book to wishlist");
        throw new Error('Failed to add book to wishlist');
      }

      setMessage('Book successfully added to wishlist!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.log(error);
    }
  };
  
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
        <button className="addButton" onClick={addToWishlist} >
          Add to Wishlist
        </button>

        {/* Display a success or error message */}
        {message && <p>{message}</p>}
      </div>

    </div>
  </div>
</div>
    );
  };
export default BookDetails