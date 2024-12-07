import React, { useState, useEffect } from 'react';
import './ApplyJob.css'; // ApplyJob styles
const ApplyJob = () => {
  const [job, setJob] = useState(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Get the job data from localStorage
    const storedJob = localStorage.getItem('selectedJob');
    if (storedJob) {
      setJob(JSON.parse(storedJob));
    } else {
      setError('Job details not found.');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (applicantName && applicantEmail && coverLetter) {
      alert('Application submitted successfully!');
      // Handle submission logic here (e.g., send to backend)
    } else {
      setError('Please fill in all fields.');
    }
  };

  if (!job) {
    return <div>Loading job details...</div>;
  }

  return (
    <div className="apply-job-container">
      <h2>Apply for {job.job_title} at {job.company_name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Applicant Name</label>
          <input
            type="text"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Applicant Email</label>
          <input
            type="email"
            value={applicantEmail}
            onChange={(e) => setApplicantEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Cover Letter</label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="submit-btn">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyJob;
