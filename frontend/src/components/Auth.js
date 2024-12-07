import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'job_seeker',
    phone_number: '',
    profile_image: null,  // Initialize profile image as null
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_image') {
      setFormData({ ...formData, profile_image: files[0] }); // Set the file object
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? '/register' : '/login';

    try {
      let response;
      if (isRegister) {
        // Create FormData for file upload
        const registrationFormData = new FormData();
        registrationFormData.append('name', formData.name);
        registrationFormData.append('email', formData.email);
        registrationFormData.append('password', formData.password);
        registrationFormData.append('role', formData.role);
        registrationFormData.append('phone_number', formData.phone_number);
        
        // Append the profile image file if present
        if (formData.profile_image) {
          registrationFormData.append('profile_image', formData.profile_image);
        }

        response = await axios.post(`http://localhost:3200${endpoint}`, registrationFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // Login request
        response = await axios.post(`http://localhost:3200${endpoint}`, {
          email: formData.email,
          password: formData.password,
        });
      }

      // Handle response
      if (response.data.message) alert(response.data.message);

      if (!isRegister && response.data.token) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/profile';
      }

      if (isRegister) {
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'job_seeker',
          phone_number: '',
          profile_image: null,
        });
      }
    } catch (error) {
      alert(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {isRegister && (
          <>
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              name="profile_image"
              onChange={handleChange}
            />
          </>
        )}
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : 'New user? Register'}
      </button>
    </div>
  );
};

export default Auth;
