import React from 'react';
import { FaStar, FaQuoteLeft, FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const reviews = [
    {
        id: 1,
        name: "Shubham Rajpoot",
        role: "Senior Software Engineer",
        company: "MIET",
        rating: 5,
        review: "The skill gap analysis was incredibly accurate and helped me identify exactly what I needed to focus on. The personalized recommendations were spot-on!",
        image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Product Manager",
        company: "InnovateX",
        rating: 5,
        review: "This tool transformed my career planning. The detailed analysis and course recommendations helped me bridge my skill gaps effectively.",
        image: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Data Scientist",
        company: "DataFlow",
        rating: 5,
        review: "The AI-powered analysis was impressive. It not only identified my current skills but also provided a clear roadmap for career advancement.",
        image: "https://randomuser.me/api/portraits/women/2.jpg"
    }
];

const Reviews = () => {
    return (
        <div className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
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
                            What Our Users Say
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Join thousands of professionals who have transformed their careers with our AI-powered skill analysis
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 h-full border border-white/10 hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-2">
                                <div className="flex items-center mb-6">
                                    <div className="relative">
                                        <img
                                            src={review.image}
                                            alt={review.name}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-blue-400/50"
                                        />
                                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                                            <FaQuoteLeft className="text-white text-xs" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-white font-semibold">{review.name}</h3>
                                        <p className="text-gray-400 text-sm">{review.role}</p>
                                        <p className="text-gray-500 text-xs">{review.company}</p>
                                    </div>
                                </div>

                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`text-xl ${
                                                i < review.rating
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-600'
                                            }`}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-300 leading-relaxed mb-6">
                                    {review.review}
                                </p>

                                <div className="absolute bottom-[2px] left-1 w-[98%] h-[5px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
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
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
                        <div className="flex -space-x-2">
                            {reviews.map((review) => (
                                <img
                                    key={review.id}
                                    src={review.image}
                                    alt={review.name}
                                    className="w-8 h-8 rounded-full border-2 border-gray-800"
                                />
                            ))}
                        </div>
                        <span className="text-white font-medium">
                            Join <span className="text-blue-400">10,000+</span> professionals
                        </span>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
};

export default Reviews; 