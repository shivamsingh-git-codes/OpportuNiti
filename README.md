Opportuniti is a platform designed to help professionals find job opportunities that match their skills and career aspirations. The website allows users to browse job listings, apply for jobs, and manage their profiles. The goal of Opportuniti is to make the job search process easier, faster, and more efficient.

Features
User Registration and Login: Users can create an account, log in, and manage their profiles.
Job Listings: Browse job listings from various companies, filter by location, job title, and employment type.
Job Applications: Apply for jobs directly through the platform by submitting your resume and cover letter.
Profile Management: Update personal information, profile image, and job application history.
Authentication: Secure user login with JWT tokens to authenticate users.
Tech Stack
Frontend: React.js
Backend: Node.js, Express.js
Database: PostgreSQL
Cloud Storage: Cloudinary (for storing profile images)
Authentication: JSON Web Tokens (JWT)
Setup Instructions
Prerequisites
Before running the project, ensure you have the following installed:

Node.js
PostgreSQL
Cloudinary Account
1. Clone the Repository
bash
Copy code
git clone https://github.com/shivamsingh-git-codes/opportuniti.git
cd opportuniti
2. Install Dependencies
Install both frontend and backend dependencies:

bash
Copy code
# For backend (Node.js)
npm install
3. Set Up the Database
Install PostgreSQL and create a new database named opportuniti.
Configure the database connection in the .env file. The format should be:
bash
Copy code
DB_USER=your-db-user
DB_HOST=localhost
DB_DATABASE=opportuniti
DB_PASSWORD=your-db-password
DB_PORT=5432
4. Set Up Cloudinary
Create a Cloudinary account.
Add your Cloudinary credentials to the .env file.
bash
Copy code
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
5. Run the Project
Start the backend server:

bash
Copy code
node backend
Visit http://localhost:3200 in your browser to access the platform.

Endpoints
Here are the available API endpoints:

1. User Registration
POST /register
Request body: { name, email, password, role, phone_number, profile_image }
Upload profile image (optional)
2. User Login
POST /login
Request body: { email, password }
Returns JWT token for authenticated requests.
3. User Profile
GET /profile
Fetch user profile using the JWT token.
4. Job Listings
GET /jobs

Fetch all job listings.
POST /add-job

Create a new job listing.
Request body: { job_title, company_name, location, employment_type, salary, etc. }
5. Job Applications
POST /apply-job
Apply for a job.
Request body: { job_id, applicant_name, applicant_email, resume_link, cover_letter }
Contributing
We welcome contributions to Opportuniti! If you'd like to contribute, please follow these steps:

Fork the repository
Create a new branch (git checkout -b feature-name)
Commit your changes (git commit -am 'Add new feature')
Push to the branch (git push origin feature-name)
Create a new Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any inquiries or issues, please contact us at:
Email: shivam.sk7654321@gmail.com

