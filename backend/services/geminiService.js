import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Debug logging for API key
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getCourseRecommendations(skills, targetRole) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY environment variable is not set');
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const prompt = `Given the following skills and target role, recommend specific courses and certifications:
        Target Role: ${targetRole}
        Skills to focus on: ${skills.join(', ')}
        
        Please provide:
        1. Specific course recommendations (with platform names)
        2. Certification paths
        3. Learning resources
        Format the response as a JSON object with the following structure:
        {
            "courses": [
                {
                    "name": "Course Name",
                    "platform": "Platform Name",
                    "url": "Course URL",
                    "description": "Brief description"
                }
            ],
            "certifications": [
                {
                    "name": "Certification Name",
                    "issuer": "Issuing Organization",
                    "description": "Brief description"
                }
            ],
            "resources": [
                {
                    "type": "Resource Type",
                    "name": "Resource Name",
                    "url": "Resource URL",
                    "description": "Brief description"
                }
            ]
        }

        Important: Return ONLY the JSON object, without any markdown formatting or additional text.`;

        console.log('Sending request to Gemini API...');
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Clean the response text by removing markdown formatting
        const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
        
        // Parse the JSON response
        try {
            return JSON.parse(cleanText);
        } catch (parseError) {
            console.error('Error parsing Gemini response:', parseError);
            console.error('Raw response:', text);
            return {
                courses: [],
                certifications: [],
                resources: []
            };
        }
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw error;
    }
}

export { getCourseRecommendations }; 