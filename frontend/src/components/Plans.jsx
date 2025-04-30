import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaCrown, FaRocket, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const plans = [
    {
        name: "Basic",
        icon: <FaStar className="text-yellow-400 text-3xl" />,
        price: "₹499",
        credits: 50,
        features: [
            "50 AI Analysis Credits",
            "Basic Skill Gap Report",
            "Email Support",
            "7-day History Access",
            "Standard Response Time"
        ],
        popular: false,
        gradient: "from-blue-400 to-blue-600"
    },
    {
        name: "Professional",
        icon: <FaCrown className="text-yellow-400 text-3xl" />,
        price: "₹999",
        credits: 120,
        features: [
            "120 AI Analysis Credits",
            "Detailed Skill Gap Report",
            "Priority Email Support",
            "30-day History Access",
            "Faster Response Time",
            "Custom Learning Paths",
            "Industry Benchmarking"
        ],
        popular: true,
        gradient: "from-purple-400 to-purple-600"
    },
    {
        name: "Enterprise",
        icon: <FaRocket className="text-yellow-400 text-3xl" />,
        price: "₹2499",
        credits: 350,
        features: [
            "350 AI Analysis Credits",
            "Advanced Skill Gap Report",
            "24/7 Priority Support",
            "90-day History Access",
            "Instant Response Time",
            "Custom Learning Paths",
            "Industry Benchmarking",
            "Team Analytics Dashboard",
            "API Access"
        ],
        popular: false,
        gradient: "from-teal-400 to-teal-600"
    }
];

const Plans = () => {
    return (
        <>
       
        <div className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-extrabold text-white mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                            Choose Your Plan
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Select the perfect plan for your skill development journey
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className={`h-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-2 ${plan.popular ? 'ring-2 ring-blue-400' : ''}`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                        <div className="flex items-baseline">
                                            <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                                            <span className="text-gray-400 ml-2">/month</span>
                                        </div>
                                    </div>
                                    {plan.icon}
                                </div>

                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-center text-gray-300">
                                            <FaCheck className="text-green-400 mr-3 text-sm" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link 
                                    to="/credits"
                                    className={`w-full inline-flex justify-center items-center px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 bg-gradient-to-r ${plan.gradient} hover:opacity-90 transform hover:scale-105`}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex flex-col items-center space-y-4 bg-white/10 backdrop-blur-sm px-8 py-6 rounded-2xl border border-white/10">
                        <p className="text-white text-lg">Need a custom plan for your organization?</p>
                        <Link 
                            to="/contact"
                            className="inline-flex items-center px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transform hover:scale-105"
                        >
                            Contact Sales
                        </Link>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
        </> 
    );
};

export default Plans; 