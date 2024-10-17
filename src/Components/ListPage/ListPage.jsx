import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ListPage.css'
const ListPage = () => {
  const [wishlists, setWishlists] = useState([]);
  const [selectedWishlist, setSelectedWishlist] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    //Current fetching for a specific user
    fetch('https://wishlist-6d2453473a19.herokuapp.com/api/wishlists/user/2')
      .then(response => response.json())
      .then(data => setWishlists(data))
      .catch(error => console.error('Error fetching wishlists:', error));
  }, []);

  const handleWishlistClick = (wishlist) => {
    setSelectedWishlist(wishlist); // When a user selects a wishlist
  };

  const handleBookClick = (book) => {
    navigate(`/book/${book.id}`, { state: { book } }); 
  };

  return (
    <div className='page-container'>
      <div className='topBar'>
        <div><Link to="/search" className='title'>PlotPicks</Link></div>
        <div className='auth-container'>
          <div className='Logout'>LOG OUT</div>
        </div>
      </div>

      <div className='main-layout'>
        <div className='wishlist-section'>
          <h2>Your Wishlists</h2>
          <div className='resultsGrid'>
            {wishlists.length > 0 ? (
              wishlists.map((wishlist, index) => (
                <div key={index} onClick={() => handleWishlistClick(wishlist)} className='bookCard'>
                  <h3>{wishlist.title}</h3>
                </div>
              ))
            ) : (
              <p>No wishlists available</p>
            )}
          </div>
        </div>

        <div className='book-section'>
          {selectedWishlist && (
            <>
              <h3>{selectedWishlist.title}</h3>
              <div className='resultsGrid'>
                {selectedWishlist.books.map((book, index) => (
                  <div key={index} className='bookCard' onClick={() => handleBookClick(book)}>
                    <img src={book.thumbnail || book.smallThumbnail} alt={book.title} />
                    <h3>{book.title}</h3>
                    <p>{book.authors}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListPage;