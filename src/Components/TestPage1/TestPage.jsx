import React, { useEffect } from 'react';
const TestPage = () => { 
    useEffect(() => {
      const testApiCall = async () => {
        try {
            const response = await fetch('https://wishlist-6d2453473a19.herokuapp.com/books/');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('API response:', data); 
        } catch (error) {
          console.error('Error fetching data from API:', error);
        }
      };
      testApiCall();
    }, []);
    return (
      <div>
        <h1>Testing API</h1>
        <p>Check the console to see if the API call works.</p>
      </div>
    );
  };
export default TestPage