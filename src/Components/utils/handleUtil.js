import { useNavigate } from 'react-router-dom';

export const useHandleLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('https://wishlist-6d2453473a19.herokuapp.com/logout', {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.removeItem('user'); // Remove user data
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return handleLogout;
};