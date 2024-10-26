import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './BookDetails.css';
import Header from '../Header/Header';
const BLBookDetails = () => {
  const location = useLocation();
  const { book } = location.state; // Get the book data from state
  const [wishlists, setWishlists] = useState([]);
  const [selectedWishlistId, setSelectedWishlistId] = useState('');
  const [selectedWishlistTitle, setSelectedWishlistTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser.userId;
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await fetch('https://wishlist-6d2453473a19.herokuapp.com/logout', {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const response = await fetch(`https://wishlist-6d2453473a19.herokuapp.com/api/wishlists/user/${currentUserId}`);
        const data = await response.json();
        setWishlists(data);
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
  const handleWishlistChange = (e) => {
    const selectedWishlistId = e.target.value;
    const selectedWishlist = wishlists.find(wishlist => wishlist.wishlistId === parseInt(selectedWishlistId));
    setSelectedWishlistId(selectedWishlistId);
    setSelectedWishlistTitle(selectedWishlist ? selectedWishlist.title : '');
  };
  return (
    <div>
      <Header 
        user={currentUser} 
        showWelcome={false} 
        showSignUp={true} 
        showSearch={true} 
        showMyLists={true} 
        showProfile={true} 
      />
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
            <button className="removeButton"> need to add remove function</button>
            {/* Display a success or error message */}
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BLBookDetails;