import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("Logged out");
        navigate("/login");
    };

    useEffect(() => {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        if (token) {
            // Fetch users with Authorization header
            fetch(`https://wishlist-6d2453473a19.herokuapp.com/api/admin/users`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json(); // Parse JSON data
                    } else {
                        throw new Error('Failed to fetch users');
                    }
                })
                .then(data => setUsers(data)) // Set the users state with the response data
                .catch(error => console.error('Error fetching users:', error));
        } else {
            console.log('No token found');
            navigate('/login'); // Redirect to login if no token is found
        }
    }, [navigate]);
    return (
        <div>
            <div className='topBar'>
                <div><Link to="/search" className='title'>PlotPicks</Link></div>
                <div className='auth-container'>
                    <div className='Logout'>
                        <button onClick={handleLogout}>LOG OUT</button>
                    </div>
                </div>
            </div>

            <div className='main'>
                <h1>Users</h1>
                <div className='resultsGrid'>
                    {users.length > 0 ? (
                        <>
                            {users.map((user, index) => (
                                <div key={index} className='userCard'>
                                    <h3>{user.username}</h3>
                                </div>
                            ))}
                            {/*/!* Create New Wishlist button *!/*/}
                            {/*<button onClick={handleCreateNewWishlist} className='createButton'>Create New Wishlist</button>*/}
                        </>
                    ) : (
                        <>
                            <p>No users</p>
                            {/*/!* Create New Wishlist button *!/*/}
                            {/*<button onClick={handleCreateNewWishlist} className='createButton'>Create New Wishlist</button>*/}
                        </>
                    )}
                </div>
            </div>
        </div>

    );
};


export default AdminPage;