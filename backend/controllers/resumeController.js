import axios from 'axios';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { calculateAnalysisCost, deductCredits, getUserCredits } from '../services/creditService.js';

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
  const userId = req.body.userId; // User ID for credit management
  const analysisType = req.body.analysisType || ['missingSkills', 'courses', 'certifications', 'resources']; // Types of analysis requested
  
  try {
    // Calculate credit cost for the requested analysis
    const creditCost = calculateAnalysisCost(analysisType);
    
    // Deduct credits if user is authenticated
    if (userId) {
      try {
        const remainingCredits = await deductCredits(userId, creditCost);
        console.log(`Deducted ${creditCost} credits from user ${userId}. Remaining balance: ${remainingCredits}`);
      } catch (creditError) {
        return res.status(400).json({ message: creditError.message });
      }
    }
    
    // Make request to the Python Flask service
    const response = await axios.post('http://localhost:5001/analyze', {
      resumeText,
      targetRole
    });

    // Return the response from ML API along with credit cost information
    res.json({
      ...response.data,
      creditCost,
      // Add remaining credits if user is authenticated
      ...(userId && { creditsRemaining: await getUserCredits(userId) })
    });
  } catch (error) {
    res.status(500).json({ message: 'Error communicating with ML service', error: error.message });
  }
} 