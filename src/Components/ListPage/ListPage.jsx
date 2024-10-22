import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ListPage.css'

const ListPage = () => {
  const [wishlists, setWishlists] = useState([]);
  const [selectedWishlist, setSelectedWishlist] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage['user']);
  const userId = user.userId;

  useEffect(() => {
    // Fetch wishlists for the specific user
    fetch(`https://wishlist-6d2453473a19.herokuapp.com/api/wishlists/user/${userId}`)
      .then(response => response.json())
      .then(data => setWishlists(data))
      .catch(error => console.error('Error fetching wishlists:', error));
  }, [userId]);

  const handleWishlistClick = (wishlist) => {
    setSelectedWishlist(wishlist); // When a user selects a wishlist
  };

  const handleBookClick = (book) => {
    navigate(`/book/${book.title}`, { state: { book } });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("Logged out");
    navigate("/login");
  };

  const handleCreateNewWishlist = () => {
    navigate("/newList"); // Navigate to the new wishlist creation page
  };

  return (
    <div className='page-container'>
      <div className='topBar'>
        <div><Link to="/search" className='title'>PlotPicks</Link></div>
        <div className='auth-container'>
          <div className='Logout'><button onClick={handleLogout}>LOG OUT</button></div>
        </div>
      </div>
      <div className='main-layout'>
        <div className='wishlist-section'>
          <h2>Your Wishlists</h2>
          <div className='resultsGrid'>
            {wishlists.length > 0 ? (
              <>
                {wishlists.map((wishlist, index) => (
                  <div key={index} onClick={() => handleWishlistClick(wishlist)} className='bookCard'>
                    <h3>{wishlist.title}</h3>
                  </div>
                ))}
                {/* Create New Wishlist button */}
                <button onClick={handleCreateNewWishlist} className='createButton'>Create New Wishlist</button>
              </>
            ) : (
              <>
                <p>No wishlists available</p>
                {/* Create New Wishlist button */}
                <button onClick={handleCreateNewWishlist} className='createButton'>Create New Wishlist</button>
              </>
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
