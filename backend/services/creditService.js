import { User } from '../models/user.js';

// Define credit costs for different recommendation types
export const CREDIT_COSTS = {
    BASIC_ANALYSIS: 5,  // Cost for basic skill extraction
    MISSING_SKILLS: 10,  // Cost for identifying missing skills
    COURSE_RECOMMENDATIONS: 15,  // Cost for course recommendations
    CERTIFICATION_RECOMMENDATIONS: 20,  // Cost for certification recommendations
    RESOURCE_RECOMMENDATIONS: 10  // Cost for additional resource recommendations
};

// Calculate the total cost for a skill gap analysis
export const calculateAnalysisCost = (analysisType) => {
    let totalCost = CREDIT_COSTS.BASIC_ANALYSIS;
    
    if (analysisType.includes('missingSkills')) {
        totalCost += CREDIT_COSTS.MISSING_SKILLS;
    }
    
    if (analysisType.includes('courses')) {
        totalCost += CREDIT_COSTS.COURSE_RECOMMENDATIONS;
    }
    
    if (analysisType.includes('certifications')) {
        totalCost += CREDIT_COSTS.CERTIFICATION_RECOMMENDATIONS;
    }
    
    if (analysisType.includes('resources')) {
        totalCost += CREDIT_COSTS.RESOURCE_RECOMMENDATIONS;
    }
    
    return totalCost;
};

// Deduct credits from a user's account
export const deductCredits = async (userId, amount) => {
    try {
        const user = await User.findById(userId);
        
        if (!user) {
            throw new Error('User not found');
        }
        
        if (user.credits < amount) {
            throw new Error('Insufficient credits');
        }
        
        user.credits -= amount;
        await user.save();
        
        return user.credits; // Return remaining credits
    } catch (error) {
        throw error;
    }
};

// Add credits to a user's account
export const addCredits = async (userId, amount) => {
    try {
        const user = await User.findById(userId);
        
        if (!user) {
            throw new Error('User not found');
        }
        
        user.credits += amount;
        await user.save();
        
        return user.credits; // Return updated total credits
    } catch (error) {
        throw error;
    }
};

// Get user's current credit balance
export const getUserCredits = async (userId) => {
    try {
        const user = await User.findById(userId);
        
        if (!user) {
            throw new Error('User not found');
        }
        
        return user.credits;
    } catch (error) {
        throw error;
    }
}; 