import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminPage.css';


const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [isOn, setIsOn] = useState(false); // Initial state is "off"

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    const handleDeleteUser = async () => {
        try {
            const response = await fetch('https://wishlist-6d2453473a19.herokuapp.com/api/admin/users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, roles: 'USER' }),
            });

            if (!response.ok) {
                throw new Error(`Signup failed: ${response.statusText}`);  // Log error status
            }

            const data = await response.json();
            console.log('Signup successful:', data);  // Log success
            navigate('/login'); // Redirect to login after successful signup
        } catch (error) {
            console.error('Error during signup:', error);  // Log detailed error
            alert('Signup failed. Please try again.');  // Provide user feedback
        }
    };


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
            <div className='adminTopBar'>
                <div><Link to="/" className='title'>PlotPicks Admin</Link></div>
                <div className='auth-container'>
                    <div className='Logout'>
                        <button onClick={handleLogout}>LOG OUT</button>
                    </div>
                </div>
            </div>

            <div className='admin-dashboard'>
                <h1>Admin Dashboard</h1>
                <div style={{display: 'flex', flexDirection:'row', justifyContent:'center',gap:'20px'}}>
                    <div className="toggle-switch">
                        <label className="switch">
                            <input type="checkbox" checked={isOn} onChange={handleToggle}/>
                            <span className="slider"></span>
                        </label>
                        <p>{isOn ? "Editing" : "Edit Users"}</p>
                    </div>
                    <div style={{alignContent:'center'}}>
                        <button  className='action-button'>Add New User</button>
                    </div>
                </div>

                <section className='analytics-section'>

                    <p>Total Users: {users.length}</p>
                </section>

                <section className='user-management'>
                    <h2>User Management</h2>
                    <div className='resultsGrid'>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <div key={index} className='userCard'>
                                    <h3>{user.username}</h3>
                                    <p>{user.roles}</p>
                                    {isOn===true && (
                                        <>
                                            <button className='deleteButton'>X</button>
                                            <button className='action-button'>Change Username</button>
                                            <button className='action-button'>Switch Role</button>
                                        </>
                                    )}

                                </div>
                            ))
                        ) : (
                            <p>No users found</p>
                        )}
                    </div>
                </section>

            </div>
        </div>
    );

};


export default AdminPage;