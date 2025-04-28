import express from 'express';
import { uploadResume, analyzeResume } from '../controllers/resumeController.js';

const router = express.Router();

// Route to upload resume
router.post('/upload', uploadResume);

// Route to analyze resume
router.post('/analyze', analyzeResume);

export default router; 