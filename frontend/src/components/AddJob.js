import React, { useState } from 'react';
import axios from 'axios';
import './AddJob.css';

const AddJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [remoteOption, setRemoteOption] = useState(false);
  const [salary, setSalary] = useState('');
  const [postedDate, setPostedDate] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [jobResponsibilities, setJobResponsibilities] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');
  const [preferredSkills, setPreferredSkills] = useState('');
  const [applicationProcess, setApplicationProcess] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = {
      job_title: jobTitle,
      company_name: companyName,
      location,
      employment_type: employmentType,
      remote_option: remoteOption,
      salary,
      posted_date: postedDate,
      company_description: companyDescription || null,
      job_responsibilities: jobResponsibilities || null,
      job_requirements: jobRequirements || null,
      preferred_skills: preferredSkills || null,
      application_process: applicationProcess || null,
      contact_email: contactEmail || null,
      external_link: externalLink || null,
    };

    try {
      const response = await axios.post('http://localhost:3200/add-job', jobData);
      setSuccess(`Job added successfully! Job ID: ${response.data.job.job_id}`);
      setError('');

      // Clear form fields
      setJobTitle('');
      setCompanyName('');
      setLocation('');
      setEmploymentType('');
      setRemoteOption(false);
      setSalary('');
      setPostedDate('');
      setCompanyDescription('');
      setJobResponsibilities('');
      setJobRequirements('');
      setPreferredSkills('');
      setApplicationProcess('');
      setContactEmail('');
      setExternalLink('');
    } catch (err) {
      setError('Failed to add job');
      setSuccess('');
    }
  };

  return (
    <div className="add-job-container">
      <h2>Add Job</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit} className="add-job-form">
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
  <label>Employment Type:</label>
  <select
    value={employmentType}
    onChange={(e) => setEmploymentType(e.target.value)}
    required
  >
    <option value="" disabled>Select Employment Type</option>
    <option value="Full-Time">Full-Time</option>
    <option value="Part-Time">Part-Time</option>
    <option value="Contract">Contract</option>
    <option value="Freelance">Freelance</option>
    <option value="Temporary">Temporary</option>
    <option value="Internship">Internship</option>
    <option value="Apprenticeship">Apprenticeship</option>
    <option value="Volunteer">Volunteer</option>
    <option value="Casual/On-Call">Casual/On-Call</option>
    <option value="Remote">Remote</option>
  </select>
</div>

        <div className="form-group">
          <label>Remote Option:</label>
          <input
            type="checkbox"
            checked={remoteOption}
            onChange={() => setRemoteOption(!remoteOption)}
          />
        </div>
        <div className="form-group">
          <label>Salary:</label>
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Posted Date:</label>
          <input
            type="date"
            value={postedDate}
            onChange={(e) => setPostedDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Company Description (Optional):</label>
          <textarea
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Job Responsibilities (Optional):</label>
          <textarea
            value={jobResponsibilities}
            onChange={(e) => setJobResponsibilities(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Job Requirements (Optional):</label>
          <textarea
            value={jobRequirements}
            onChange={(e) => setJobRequirements(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Preferred Skills (Optional):</label>
          <textarea
            value={preferredSkills}
            onChange={(e) => setPreferredSkills(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Application Process (Optional):</label>
          <textarea
            value={applicationProcess}
            onChange={(e) => setApplicationProcess(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contact Email (Optional):</label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>External Link (Optional):</label>
          <input
            type="url"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">Add Job</button>
      </form>
    </div>
  );
};

export default AddJob;
