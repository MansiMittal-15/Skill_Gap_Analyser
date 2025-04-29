import express from 'express';
import multer from 'multer';
import axios from 'axios';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import userRoute from './routes/user.js';
import bodyParser from 'body-parser';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { getCourseRecommendations } from './services/geminiService.js';

// Load environment variables
dotenv.config();

// Debug logging for environment variables
console.log('Environment variables loaded:');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing');
console.log('PORT:', process.env.PORT || '8001 (default)');

const app = express();
const port = process.env.PORT || 8001;
const ML_SERVICE_URL = 'http://localhost:5001';

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Check ML service availability
async function checkMLService() {
    try {
        await axios.get(`${ML_SERVICE_URL}/`);
        return true;
    } catch (error) {
        console.error('ML service is not available:', error.message);
        return false;
    }
}

// Upload route
app.post('/upload', upload.single('resume'), async (req, res) => {
    try {
        // Debug log: log received file and form data
        console.log('Received file:', req.file);
        console.log('Received form data:', req.body);
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Get target role from request body
        const targetRole = req.body.targetRole || 'Full Stack Developer';

        // Check if ML service is available
        const isMLServiceAvailable = await checkMLService();
        if (!isMLServiceAvailable) {
            return res.status(503).json({ 
                error: 'ML service is not available',
                details: 'Please ensure the ML service is running on port 5001'
            });
        }

        const resumeFile = req.file;
        let resumeText = '';

        if (resumeFile.mimetype === 'application/pdf') {
            try {
                const data = await pdfParse(resumeFile.buffer);
                resumeText = data.text;
            } catch (pdfError) {
                console.error('PDF parsing error:', pdfError);
                return res.status(400).json({ error: 'Error parsing PDF file' });
            }
        } else {
            resumeText = resumeFile.buffer.toString('utf-8');
        }

        if (!resumeText.trim()) {
            return res.status(400).json({ error: 'No text content found in the file' });
        }

        try {
            console.log('Sending request to ML service...');
            const response = await axios.post(`${ML_SERVICE_URL}/analyze`, { 
                resumeText: resumeText,
                targetRole: targetRole
            });
            // Debug log: log ML service response
            console.log('ML service response:', response.data);
            // Get AI-powered course recommendations
            const recommendations = await getCourseRecommendations(
                response.data.missingSkills,
                targetRole
            );

            // Combine ML analysis with AI recommendations
            const result = {
                ...response.data,
                recommendations: recommendations
            };

            console.log('ML service response with recommendations:', result);
            res.json(result);
        } catch (mlError) {
            console.error('ML service error:', mlError.response?.data || mlError.message);
            return res.status(500).json({ 
                error: 'Error communicating with ML service',
                details: mlError.response?.data || mlError.message
            });
        }
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ 
            error: 'Error processing file',
            details: error.message
        });
    }
});

// Existing routes
app.use('/api/v1/user', userRoute);

// Start server
app.listen(port, () => { 
    connectDB();
    console.log(`Server running on http://localhost:${port}`);
    console.log(`ML service URL: ${ML_SERVICE_URL}`);
});