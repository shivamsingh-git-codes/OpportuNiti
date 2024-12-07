import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/auth'); // Redirect to login if not authenticated
          return;
        }

        const response = await axios.get('http://localhost:3200/profile', {
          headers: { Authorization: token },
        });

        setUser(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        navigate('/auth');
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  // Function to determine the correct image URL
  const getImageUrl = (profileImage) => {
    if (!profileImage) {
      return 'https://via.placeholder.com/150'; // Fallback image if no profile image is available
    }

    // Check if the image URL starts with 'http' or 'https', indicating it's an external URL
    if (profileImage.startsWith('http://') || profileImage.startsWith('https://')) {
      return profileImage; // Return the external URL directly
    }

    // Check if the image is hosted on Cloudinary
    if (profileImage.includes('res.cloudinary.com')) {
      return profileImage; // Return the Cloudinary image URL
    }

    // Otherwise, assume it's a local image and prepend the local server's URL
    return `http://localhost:3200${profileImage}`;
  };

  return (
    <div className="profile-container">
      <h2>Welcome, {user.name}!</h2>
      {/* Use the appropriate image URL */}
      <img
        src={getImageUrl(user.profile_image)} 
        alt={`${user.name}'s profile`}
        style={{ width: '150px', height: '150px', borderRadius: '50%' }}
      />
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Phone:</strong> {user.phone_number}</p>
      <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default Profile;
