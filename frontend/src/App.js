import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Employers from './components/Employers';
import Profile from './components/Profile';
import Auth from './components/Auth';
import AddJob from './components/AddJob'; // Import the AddJob component
import ApplyJob from './components/ApplyJob';
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/employers/add-job" element={<AddJob />} /> {/* Add route for AddJob */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/apply-job" element={<ApplyJob />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
