import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-blue-400 via-purple-400 to-teal-300 opacity-30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-green-300 via-blue-200 to-purple-300 opacity-20 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>
      {/* Fading Overlay for text clarity */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/60 to-transparent z-10 pointer-events-none"></div>
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center gap-8 py-20 px-4 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-base bg-slate-200/80 text-black px-4 py-2 border rounded-3xl flex gap-2 items-center shadow-sm"
        >
          <FaCheck className="text-green-600" />
          <span>
            <span className="text-blue-700 font-semibold">No. 1</span> AI based Skill Gap Analyser
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-6xl sm:text-7xl font-extrabold leading-tight tracking-tight mb-2"
        >
          Stay Ahead with <br />
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-teal-400 bg-clip-text text-transparent animate-gradient-x">
            AI-Powered Skill Insights
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl text-gray-700 max-w-2xl mx-auto mb-4"
        >
          Identify, analyze, and close your skill gaps with real-time data from industry standards, job roles, and evolving market needs.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex gap-6 flex-wrap justify-center"
        >
          <Link to="/analyse-form">
            <button className="group relative px-8 py-3 text-lg rounded-full font-semibold bg-gradient-to-r from-blue-700 to-purple-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(88,126,255,0.5)] focus:outline-none focus:ring-2 focus:ring-blue-400">
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-full animate-glow"></div>
            </button>
          </Link>
          <Link to="/services">
            <button className="px-8 py-3 text-lg rounded-full font-semibold bg-white text-blue-700 border-2 border-blue-700 shadow hover:bg-blue-50 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Learn More
            </button>
          </Link>
        </motion.div>
        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2 text-gray-600">
            <span className="font-medium">Trusted by</span>
            <span className="font-bold text-blue-700">10,000+</span>
            <span>professionals</span>
          </div>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${i}.jpg`}
                alt={`User ${i}`}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            ))}
          </div>
        </motion.div>
      </div>
      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes glow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-glow {
          background: linear-gradient(90deg, transparent, rgba(88,126,255,0.3), transparent);
          background-size: 200% 100%;
          animation: glow 2s linear infinite;
        }
        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 8s linear infinite;
        }
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.15;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
