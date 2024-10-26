import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminPage.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');


const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(null);  // Track editing user
    const [newUsername, setNewUsername] = useState('');
    const navigate = useNavigate();
    const [isOn, setIsOn] = useState(false); // Initial state is "off"
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUsername2, setNewUsername2] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const token = localStorage.getItem('token');

    const handleToggle = () => {
        setIsOn(!isOn);
        setIsEditing(null);
        setNewUsername('');
    };

    const [isChecked, setRole] = useState(false);

    const handleSetRole = (e) => {
        setRole(e.target.checked);
    };

    const handleAddNewUser = async () => {
        let role = isChecked === true ? "ADMIN" : "USER";
        try {
            const response = await fetch(`https://wishlist-6d2453473a19.herokuapp.com/api/admin/users?username=${newUsername2}&password=${newPassword}&role=${role}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                console.log(`User created successfully`);
                handleCloseModal();
                await fetchUsers();
            } else {
                alert("User creation failed")
                throw new Error(`User creation failed: ${response.statusText}`);  // Log error status
            }
        } catch (error) {
            console.error('Error creating user:', error);  // Log detailed error
        }
    };

    const handleDeleteUser = async (user) => {
        if (user.username === currentUser.username) {
            alert("Can not delete own account");
            return;
        }
        const isConfirmed = window.confirm(`Are you sure you want to delete ${user.username}?`);

        if (!isConfirmed) {
            return; // Exit if the user cancels
        }
        try {
            const response = await fetch(`https://wishlist-6d2453473a19.herokuapp.com/api/admin/users?username=${user.username}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                console.log(`User deleted successfully`);
                await fetchUsers();
            } else {
                throw new Error(`Delete failed: ${response.statusText}`);  // Log error status
            }
        } catch (error) {
            console.error('Error deleting user:', error);  // Log detailed error
        }
    };

    const handleChangeUsername = async (user) => {
        try {
            const response = await fetch(`https://wishlist-6d2453473a19.herokuapp.com/api/admin/username?username=${user.username}&newUsername=${newUsername}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                console.log(`Username changed to ${newUsername}`);
                setIsEditing(null);  // Exit edit mode
                setNewUsername(''); //clear username input
                await fetchUsers();
            } else {
                throw new Error('Failed to change username');
            }
        } catch (error) {
            console.error("Error changing username", error);
        }
    };

    const handleEditClick = (user) => {
        setIsEditing(user.username);
        setNewUsername(user.username);
    };

    const handleCancelEdit = () => {
        setIsEditing(null);
        setNewUsername('');
    };

    const handleChangeRole = async (user,role) =>{
        role = role === "USER" ? "ADMIN" : "USER";
        try {
            const response = await fetch(`https://wishlist-6d2453473a19.herokuapp.com/api/admin/role?username=${user.username}&role=${role}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                console.log(`${user.name}'s role changed successfully`);
                await fetchUsers();
            } else {
                throw new Error(`Role change failed: ${response.statusText}`);  // Log error status
            }
        } catch (error) {
            console.error('Error changing role:', error);  // Log detailed error
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("Logged out");
        navigate("/login");
    };

    const fetchUsers = async () => {
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
    });

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
                    <div style={{alignContent: 'center'}}>
                            <button className='action-button' onClick={handleOpenModal}>Add New User</button>

                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={handleCloseModal}
                            contentLabel="Add New User"
                            className="modal"
                            overlayClassName="overlay"
                        >
                            <div style={{display:'flex',flexDirection:'column', justifyContent:'center'}}>
                                <h2>Add New User</h2>
                                <div className='inputs'>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={newUsername2}
                                        onChange={(e) => setNewUsername2(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <p style={{marginRight: '8px'}}>Admin?</p>
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={handleSetRole}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button className='action-button' onClick={handleAddNewUser}>Add User</button>
                                    <button className='action-button' onClick={handleCloseModal}>Cancel</button>
                                </div>

                            </div>
                        </Modal>
                    </div>
                </div>

                <section className='analytics-section'>

                    <p>Total Users: {users.length}</p>
                </section>

                <section className='user-management'>
                    <h2 style={{paddingBottom: '20px'}}>User Management</h2>
                    <div className='resultsGrid'>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <div key={index} className='userCard'>
                                {isEditing === user.username ? (
                                        <input
                                            type="text"
                                            value={newUsername}
                                            onChange={(e) => setNewUsername(e.target.value)}
                                        />
                                    ) : (
                                        <h3>{user.username}</h3>
                                    )}
                                    <p>{user.roles}</p>
                                    {isOn && (
                                        <>
                                            <button className='deleteButton' onClick={() => handleDeleteUser(user)}>X</button>
                                            {isEditing === user.username ? (
                                                <>
                                                    <button
                                                        className='action-button'
                                                        onClick={() => handleChangeUsername(user)}
                                                    >Save</button>
                                                    <button
                                                        className='action-button'
                                                        onClick={handleCancelEdit}
                                                    >Cancel</button>
                                                </>
                                            ) : (
                                                <button
                                                    className='action-button'
                                                    onClick={() => handleEditClick(user)}
                                                >Change Username</button>
                                            )}
                                            <button className='action-button' onClick={() => handleChangeRole(user,user.roles)}>Switch Role</button>
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