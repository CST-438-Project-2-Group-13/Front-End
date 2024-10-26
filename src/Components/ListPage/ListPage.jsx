import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ListPage.css';
import Header from '../Header/Header';

const ListPage = () => {
  const [wishlists, setWishlists] = useState([]);
  const [selectedWishlist, setSelectedWishlist] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage['user']);
  const userId = user.userId;

  useEffect(() => {
    // Fetch wishlists for the specific user
    fetchWishlists();
  }, [userId]);

  const fetchWishlists = () => {
    fetch(`https://wishlist-6d2453473a19.herokuapp.com/api/wishlists/user/${userId}`)
      .then(response => response.json())
      .then(data => setWishlists(data))
      .catch(error => console.error('Error fetching wishlists:', error));
  };

  const handleWishlistClick = (wishlist) => {
    setSelectedWishlist(wishlist); // When a user selects a wishlist
  };

  const handleBookClick = (book) => {
    navigate(`/blbookdetails/${book.title}`, { state: { book } });
  };

  const handleCreateNewWishlist = () => {
    navigate("/new"); // Navigate to the new wishlist creation page
  };

  const handleDeleteWishlist = (wishlistId) => {
    //console.log("Selected Wishlist:", selectedWishlist); 
    //console.log("Wishlist ID:", wishlistId);
    if (window.confirm("Are you sure you want to delete this wishlist?")) {
      fetch(`https://wishlist-6d2453473a19.herokuapp.com/api/wishlists/${wishlistId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) 
          {
            alert("Wishlist deleted successfully!");
            fetchWishlists(); // refreshes the lists of lists 
            setSelectedWishlist(null); //then clears the card 
          } 
          else 
          {
            alert("Failed to delete wishlist. Please try again.");
          }
        });
    }
  };

  return (
    <div className='page-container'>
      <Header 
        user={user} 
        showWelcome={false} 
        showSignUp={true} 
        showSearch={true} 
        showMyLists={true} 
        showProfile={true} 
      />
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
                <div className='DeleteCard' onClick={() => handleDeleteWishlist(selectedWishlist.wishlistId)}>
                  <img src={'https://cdn-icons-png.flaticon.com/512/1214/1214428.png'} alt="Delete"/>
                  <h3>Delete List</h3>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListPage;