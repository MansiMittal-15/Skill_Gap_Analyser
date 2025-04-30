import express from 'express';
import { getUserCredits, addCredits } from '../services/creditService.js';

const router = express.Router();

// Get user's credit balance
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const credits = await getUserCredits(userId);
        res.json({ credits });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add credits to a user's account (admin only in a real app)
router.post('/add/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { amount } = req.body;
        
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Invalid credit amount' });
        }
        
        const newBalance = await addCredits(userId, parseInt(amount));
        res.json({ credits: newBalance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router; 