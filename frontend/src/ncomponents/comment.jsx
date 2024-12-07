/*import React, { useEffect, useState } from 'react';
import Users from './Users'; // Import the Users component

function App() {
    const [users, setUsers] = useState([]); // Initialize as an empty array

    useEffect(() => {
        fetch('http://localhost:3200/data')
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:", data); // Log data to confirm
                setUsers(data); // Set all users in the array
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <Users users={users} /> /*{/* Pass users data as a prop */}
     /*   </div>
    );
}

export default App;  */
