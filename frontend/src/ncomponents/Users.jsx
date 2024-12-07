import React, { useState } from 'react';
import Connect from './Connect'; // Import the Connect component

const stylesheet = {
    usersContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        padding: '20px',
        marginLeft: '0px',
    },
    userCard: {
        width: '23.75%',
        boxSizing: 'border-box',
        padding: '20px',
        textAlign: 'center',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9', // Light background for the card
        border: '1px solid black', // Border around the card
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    userCardHover: {
        transform: 'translateY(-5px)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
    profileImage: {
        width: '95px',
        height: '95px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid black',
        marginBottom: '10px',
    },
    userName: {
        fontSize: '18px',
        margin: '5px 0',
        color: '#2c3e50', // Dark slate blue for the name
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: '14px',
        color: 'blue', // Medium gray for the email
    },
};

const Users = ({ users }) => {
    const [connections, setConnections] = useState([]); // Store connected users

    const handleConnect = (user) => {
        setConnections([...connections, user]);
        console.log(`${user.name} connected!`);
        // You can also add logic here to store the connection in the database or update the server
    };
  /*  const [users, setUsers] = useState([]);

    // Fetch data from the server
    useEffect(() => {
        fetch('http://localhost:3200/data')
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:", data);
                setUsers(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);*/

    return (
        <div style={stylesheet.usersContainer}>
            {users.map((user) => (
                <div
                    key={user.user_id}
                    style={stylesheet.userCard}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = stylesheet.userCardHover.transform;
                        e.currentTarget.style.boxShadow = stylesheet.userCardHover.boxShadow;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                    }}
                >
                    <img src={user.profile_image} alt={`${user.name}'s profile`} style={stylesheet.profileImage} />
                    <h2 style={stylesheet.userName}>{user.name}</h2>
                    <h2 style={stylesheet.userEmail}>{user.email}</h2>
                    <Connect onConnect={() => handleConnect(user)} /> {/* Pass handleConnect function */}
                </div>
            ))}
        </div>
    );
};

export default Users;
