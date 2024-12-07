// Connect.jsx
import React from 'react';

const Connect = ({ onConnect }) => {
    return (
        <button
            onClick={onConnect}
            style={{
                padding: '10px 20px',
                backgroundColor: '#3498db', // Blue button
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'} // Darker on hover
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'} // Reset color
        >
            Connect
        </button>
    );
};

export default Connect;
