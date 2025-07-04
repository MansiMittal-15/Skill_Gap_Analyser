const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const { analyzeResume } = require('./controllers/resumeController');
const router = express.Router();

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

// Route to upload resume
router.post('/upload', upload.single('resume'), (req, res) => {
  res.json({ message: 'File uploaded successfully', filePath: req.file.path });
});

// Route to analyze resume (communicating with ML microservice)
router.post('/analyze', analyzeResume);

module.exports = router; 