import React, { useState, useEffect } from 'react'; 
import { useNavigate, Link} from 'react-router-dom';
import './SearchPage.css'

const searchBooks = async (query) => {
  try {
    const response = await fetch(`https://wishlist-6d2453473a19.herokuapp.com/searchBooks?query=${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    const savedResults = localStorage.getItem('searchResults');

    if (savedQuery && savedResults) {
      setSearchQuery(savedQuery);
      setSearchResults(JSON.parse(savedResults));
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const results = await searchBooks(searchQuery);
      setSearchResults(results);

      // Save the search query and results to localStorage
      localStorage.setItem('searchQuery', searchQuery);
      localStorage.setItem('searchResults', JSON.stringify(results));
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (book) => {
    navigate(`/book/${book.id}`, { state: { book } }); // Navigate to the book details page
  };

  return (
    <div>
      <div className='topBar'>
      <div><Link to="/" className='title'>PlotPicks</Link></div>
        <div className='auth-container'>
          <div className='LogOut'><Link to="/login" className='LoginText'>LOG OUT</Link></div>
        </div>
      </div>
      <div className='imageBackground'>
        <form onSubmit={handleSearch} className='SearchInput'>
          <input 
            type='text' 
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className='SearchSubmit'>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>
      {searchResults.length > 0 && (
        <div className='searchResults'>
          <h2>Search Results</h2>
          <div className='resultsGrid'>
            {searchResults.map(book => (
              <div 
                key={book.id} 
                className='bookCard' 
                onClick={() => handleCardClick(book)} // Navigate on click
              >
                <img src={book.smallThumbnail} alt={book.title} />
                <h3>{book.title}</h3>
                <p>{book.authors}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className='aboutContainer'>
          <h1 class="about-title">Build. Add. Share.</h1>
          <div class="about-description">
            <p>Search books, create lists</p>
            <p>Share your wishlists with others</p>
            </div>
        </div>
    </div>
  );
};

export default SearchPage;
