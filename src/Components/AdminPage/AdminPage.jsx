import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminPage.css';


const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [isOn, setIsOn] = useState(false); // Initial state is "off"
    const token = localStorage.getItem('token');

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    const handleDeleteUser = async (user) => {
        try {
            const response = await fetch(`https://wishlist-6d2453473a19.herokuapp.com/api/admin/users?username=${user.username}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                console.log(`User ${user.name} deleted successfully`);
                await fetchUsers();
            } else {
                throw new Error(`Delete failed: ${response.statusText}`);  // Log error status
            }

            const data = await response;
            console.log(`${user.username}, User deletion successful:`, data);  // Log success
        } catch (error) {
            console.error('Error deleting user:', error);  // Log detailed error
        }
    };


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("Logged out");
        navigate("/login");
    };

    const fetchUsers = async () => {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        if (token) {
            try {
                const response = await fetch(`https://wishlist-6d2453473a19.herokuapp.com/api/admin/users`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data); // Set the users state with the response data
                } else {
                    throw new Error('Failed to fetch users');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        } else {
            console.log('No token found');
            navigate('/login'); // Redirect to login if no token is found
        }
    };

    useEffect(() => {
        fetchUsers();
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
                                            <button className='deleteButton' onClick={() => handleDeleteUser(user)}>X</button>
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