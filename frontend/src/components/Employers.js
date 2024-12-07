import React from 'react';
import { Link } from 'react-router-dom';
// Import the AddJob component
import './Employers.css'; // Import the CSS file for Employers

const Employers = () => {
  return (
    <div className="employers-container">
      <h1>Employers Section</h1>
      <Link to="/employers/add-job" className="add-job-link">
        Add New Job
      </Link>
      {/* Display the AddJob component directly */}
      
    </div>
  );
};

export default Employers;
