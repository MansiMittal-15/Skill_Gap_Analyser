import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BuyCredits = () => {
    const navigate = useNavigate();
    const [credits, setCredits] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [purchaseAmount, setPurchaseAmount] = useState(100);

    useEffect(() => {
        const fetchCredits = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('Please log in to purchase credits');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8000/api/v1/credits/${userId}`);
                setCredits(response.data.credits);
            } catch (err) {
                console.error('Error fetching credits:', err);
                setError('Could not fetch your current credit balance');
            }
        };

        fetchCredits();
    }, []);

    const handlePurchaseAmountChange = (e) => {
        setPurchaseAmount(parseInt(e.target.value));
    };

    const handlePurchase = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('Please log in to purchase credits');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post(`http://localhost:8000/api/v1/credits/add/${userId}`, {
                amount: purchaseAmount
            });

            setCredits(response.data.credits);
            setSuccess(`Successfully purchased ${purchaseAmount} credits!`);
        } catch (err) {
            console.error('Error purchasing credits:', err);
            setError('Failed to purchase credits. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="mr-4 p-2 rounded-full hover:bg-gray-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900">Buy Credits</h2>
                    </div>

                    <div className="mb-4 p-3 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-700">Your current credit balance: <span className="font-bold">{credits}</span></p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Select Credit Package
                            </label>
                            <select
                                value={purchaseAmount}
                                onChange={handlePurchaseAmountChange}
                                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="100">100 Credits ($0.99)</option>
                                <option value="250">250 Credits ($1.49)</option>
                                <option value="500">500 Credits ($2.49)</option>
                                <option value="1000">1000 Credits ($5.99)</option>
                            </select>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
                                <p className="text-sm">{success}</p>
                            </div>
                        )}

                        <button
                            onClick={handlePurchase}
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : `Buy ${purchaseAmount} Credits`}
                        </button>

                        <div className="mt-4 text-xs text-gray-500">
                            <p>* This is a simulated purchase. No actual payment will be processed.</p>
                            <p>* In a real application, this would integrate with a payment processor like Stripe.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyCredits; 