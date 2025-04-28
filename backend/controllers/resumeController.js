import axios from 'axios';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

// Setup Multer storage for uploaded resume
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Function to handle resume upload
export const uploadResume = upload.single('resume');

// Function to call the Python Flask service for analysis
export async function analyzeResume(req, res) {
  const resumeText = req.body.resumeText; // Resume content from the client
  const targetRole = req.body.targetRole; // Target job role
  
  try {
    // Make request to the Python Flask service
    const response = await axios.post('http://localhost:5001/analyze', {
      resumeText,
      targetRole
    });

    // Return the response from ML API to the client
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error communicating with ML service', error: error.message });
  }
} 