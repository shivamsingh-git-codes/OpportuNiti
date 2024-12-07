import express from "express";
import pg from "pg";
import jwt from "jsonwebtoken";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from 'url'; // For __dirname in ES6
import cloudinary from "./cloudinaryConfig.js"; // Import Cloudinary configuration
dotenv.config();
const app = express();
const port = 3200;

// Resolve __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware configuration
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from 'uploads' directory

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// PostgreSQL client setup
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch(err => console.error("Database connection error:", err));

// Register a new user with profile image upload
app.post('/register', upload.single('profile_image'), async (req, res) => {
  const { name, email, password, role, phone_number } = req.body;
  let profileImagePath = null;

  try {
    // Check if file is uploaded and upload to Cloudinary
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      profileImagePath = uploadResult.secure_url; // Cloudinary URL for the image
      fs.unlinkSync(req.file.path); // Delete the file after upload
    }

    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    await db.query(
      'INSERT INTO users (name, email, password, role, phone_number, profile_image) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, email, password, role, phone_number, profileImagePath]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login a user
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = result.rows[0];
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ user_id: user.user_id }, 'yourSecretKey', { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch user profile using token
app.get('/profile', async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Unauthorized access' });

  try {
    const decoded = jwt.verify(token, 'yourSecretKey');
    const userId = decoded.user_id;

    const result = await db.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch all users data
app.get('/data', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch all job listings
app.get('/jobs', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM jobs');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new job listing
app.post('/add-job', async (req, res) => {
  const {
    job_title,
    company_name,
    location,
    employment_type,
    remote_option,
    salary,
    posted_date,
    company_description,
    job_responsibilities,
    job_requirements,
    preferred_skills,
    application_process,
    contact_email,
    external_link,
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO jobs 
      (job_title, company_name, location, employment_type, remote_option, salary, posted_date, 
       company_description, job_responsibilities, job_requirements, preferred_skills, 
       application_process, contact_email, external_link)
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
      [
        job_title,
        company_name,
        location,
        employment_type,
        remote_option,
        salary,
        posted_date,
        company_description,
        job_responsibilities,
        job_requirements,
        preferred_skills,
        application_process,
        contact_email,
        external_link,
      ]
    );

    res.status(201).json({ message: 'Job added successfully', job: result.rows[0] });
  } catch (err) {
    console.error('Error adding job:', err);
    res.status(500).json({ error: 'Failed to add job' });
  }
});
app.post('/apply-job', async (req, res) => {
  const { job_id, applicant_name, applicant_email, resume_link, cover_letter } = req.body;

  // Validate required fields
  if (!job_id || !applicant_name || !applicant_email) {
    return res.status(400).json({ error: 'Job ID, Applicant Name, and Applicant Email are required.' });
  }

  // Optional: Validate if email format is correct
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(applicant_email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  try {
    // Check if job_id exists in jobs table (optional but recommended)
    const jobCheck = await db.query('SELECT * FROM jobs WHERE job_id = $1', [job_id]);
    if (jobCheck.rows.length === 0) {
      return res.status(400).json({ error: 'Job ID does not exist.' });
    }

    // Insert the application into the database
    const result = await db.query(
      `INSERT INTO applications (job_id, applicant_name, applicant_email, resume_link, cover_letter) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [job_id, applicant_name, applicant_email, resume_link || null, cover_letter || null]
    );

    console.log("Inserted application:", result.rows[0]); // Log the inserted row for verification

    // Return success response
    res.status(201).json({
      message: 'Application submitted successfully',
      application: result.rows[0]
    });
  } catch (err) {
    console.error('Error submitting application:', err.message); // Log error message
    res.status(500).json({ error: 'Failed to submit application. Please try again later.' });
  }
});

app.get('/application', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM applications');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
