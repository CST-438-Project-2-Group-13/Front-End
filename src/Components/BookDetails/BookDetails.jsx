import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './BookDetails.css';

const BookDetails = () => {
  const location = useLocation();
  const { book } = location.state; // Get the book data from state
  const [wishlists, setWishlists] = useState([]);
  const [selectedWishlistId, setSelectedWishlistId] = useState('');
  const [selectedWishlistTitle, setSelectedWishlistTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser.userId;

  // Fetch the list of wishlists when the component mounts
  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const response = await fetch(`https://wishlist-6d2453473a19.herokuapp.com/api/wishlists/user/${currentUserId}`);
        const data = await response.json();
        setWishlists(data); // Save the fetched wishlists
      } catch (error) {
        console.error('Error fetching wishlists:', error);
      }
    };

    fetchWishlists();
  }, [currentUserId]);

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

      if (!response.ok) {
        console.log('Failed to add book to books table');
        throw new Error('Failed to add book to books table');
      }

      const addedBook = await response.json(); 
      const bookId = addedBook.id; 

      // Add the book to the selected wishlist
      const wishlistResponse = await fetch(`https://arcane-fjord-82861-16172c6a1cca.herokuapp.com/https://wishlist-6d2453473a19.herokuapp.com/api/wishlists/${selectedWishlistId}/books/${bookId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!wishlistResponse.ok) {
        console.log("Failed to add book to wishlist");
        throw new Error('Failed to add book to wishlist');
      }

      setMessage(`Book successfully added to ${selectedWishlistTitle}!`);
      setIsModalOpen(false); // Close the modal after success
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleWishlistChange = (e) => {
    const selectedWishlistId = e.target.value;
    const selectedWishlist = wishlists.find(wishlist => wishlist.wishlistId === parseInt(selectedWishlistId));

    setSelectedWishlistId(selectedWishlistId);
    setSelectedWishlistTitle(selectedWishlist ? selectedWishlist.title : '');
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
            <button className="addButton" onClick={handleOpenModal}>
              Add to Wishlist
            </button>

            {/* Display a success or error message */}
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>

      {/* Modal for selecting wishlist */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select a Wishlist</h2>
            <select
              value={selectedWishlistId}
              onChange={handleWishlistChange}
            >
              <option value="">-- Select a Wishlist --</option>
              {wishlists.map((wishlist) => (
                <option key={wishlist.wishlistId} value={wishlist.wishlistId}>
                  {wishlist.title}
                </option>
              ))}
            </select>

            <button className="addButton" onClick={addToWishlist} disabled={!selectedWishlistId}>
              Add Book
            </button>
            <button className="closeButton" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
