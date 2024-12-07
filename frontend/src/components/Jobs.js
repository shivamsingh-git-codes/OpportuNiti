import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Jobs.css'; // Styles for Jobs component

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedJobId, setExpandedJobId] = useState(null);

  const colors = [
    '#FF5740', '#CFD6E7', '#3357FF', '#F1C40F', '#8E44AD', '#1ABC9C',
    '#2C3E50', '#cd486b', '#3498DB', '#2ECC71', '#9B59B6', '#F39C12'
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3200/jobs');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load jobs.');
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>{error}</div>;

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
  const handleCardClick = (jobId) => setExpandedJobId(expandedJobId === jobId ? null : jobId);
  
  // Redirect to ApplyJob page
  const handleApply = (job) => {
    // Pass the job details to the ApplyJob page through URL params or localStorage
    localStorage.setItem('selectedJob', JSON.stringify(job));
    window.location.href = `/apply-job`;  // Redirect to ApplyJob page
  };

  return (
    <div className="jobs-container">
      <h1>Job Listings</h1>
      {jobs.map((job) => (
        <div
          key={job.job_id}
          className={`job-card ${expandedJobId === job.job_id ? 'expanded' : ''}`}
          style={{ borderColor: getRandomColor() }}
          onClick={() => handleCardClick(job.job_id)}
        >
          <h2>{job.job_title}</h2>
          <h3>{job.company_name}</h3>
          <p><strong>Location:</strong> {job.location}</p>
          {job.employment_type && <p><strong>Employment Type:</strong> {job.employment_type}</p>}
          {job.remote_option !== null && <p><strong>Remote Option:</strong> {job.remote_option ? 'Yes' : 'No'}</p>}
          {job.posted_date && <p><strong>Posted Date:</strong> {new Date(job.posted_date).toLocaleDateString()}</p>}
          {job.salary && <p><strong>Salary:</strong> {job.salary}</p>}

          {expandedJobId === job.job_id && (
            <div className="job-details">
              {job.company_description && <p><strong>Company Description:</strong> {job.company_description}</p>}
              {job.job_responsibilities && <p><strong>Responsibilities:</strong> {job.job_responsibilities}</p>}
              {job.job_requirements && <p><strong>Requirements:</strong> {job.job_requirements}</p>}
              {job.preferred_skills && <p><strong>Preferred Skills:</strong> {job.preferred_skills}</p>}
              {job.application_process && <p><strong>Application Process:</strong> {job.application_process}</p>}
              {job.contact_email && (
                <p><strong>Contact Email:</strong> <a href={`mailto:${job.contact_email}`}>{job.contact_email}</a></p>
              )}
              <button className="apply-btn" onClick={() => handleApply(job)}>Apply Now</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Jobs;
