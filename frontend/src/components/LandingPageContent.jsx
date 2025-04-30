import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const tabs = [
  {
    name: "Overview",
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-2">What is Skill Gap Analyzer?</h2>
        <p className="text-gray-600 mb-4">
          Skill Gap Analyzer is an AI-powered platform designed to help individuals and organizations identify, understand, and bridge skill gaps. By analyzing your current skills and comparing them to industry standards or desired roles, our tool provides actionable recommendations to accelerate your growth and success.
        </p>
      </div>
    ),
  },
  {
    name: "How it Works",
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-2">How It Works</h2>
        <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-4">
          <li>Input your current skills, experience, and career goals.</li>
          <li>Our AI analyzes your profile and benchmarks it against industry requirements.</li>
          <li>Receive a detailed gap analysis and personalized recommendations for courses, certifications, and resources.</li>
          <li>Track your progress and update your profile as you grow.</li>
        </ol>
      </div>
    ),
  },
  {
    name: "Benefits",
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-2">Why Use Skill Gap Analyzer?</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>Personalized, AI-driven recommendations</li>
          <li>Clear roadmap to upskill and achieve your goals</li>
          <li>Stay competitive in a rapidly evolving job market</li>
          <li>Track your learning journey and celebrate milestones</li>
        </ul>
      </div>
    ),
  },
  {
    name: "Get Started",
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-2">Ready to Bridge Your Skill Gaps?</h2>
        <p className="text-gray-600 mb-4">
          Join thousands of learners and professionals who trust Skill Gap Analyzer to guide their growth. Start your journey today and unlock your full potential!
        </p>
        <button
          onClick={() => window.location.href = '/analyse-form'}
          className="inline-block px-6 py-2 rounded-full font-semibold transition bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Get Started
        </button>
      </div>
    ),
  },
];

const LandingPageContent = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-5xl mx-auto py-24 px-2 sm:px-8 lg:px-12">
      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 mb-4">
          Discover <span className="text-transparent ai-gradient-text">Skill Gap Analyzer</span>
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          The AI-powered platform to identify, understand, and bridge your skill gaps for a brighter future.
        </p>
      </div>
      {/* Mac-style tabbed window */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden max-w-8xl mx-auto" style={{ minHeight: '420px' }}>
        {/* Mac window bar */}
        <div className="flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
          <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
          <span className="w-3 h-3 bg-green-400 rounded-full"></span>
        </div>
        {/* Tabs */}
        <div className="flex space-x-2 px-8 pt-6 bg-gray-100 dark:bg-gray-800">
          {tabs.map((tab, idx) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 rounded-t-lg font-semibold text-lg transition-colors duration-200 focus:outline-none ${
                activeTab === idx
                  ? 'bg-white dark:bg-gray-900 text-blue-700 dark:text-blue-300 shadow-md'
                  : 'text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        {/* Tab content */}
        <div className="bg-white dark:bg-gray-900 px-12 py-10 min-h-[260px] transition-all duration-300 text-gray-800 dark:text-gray-100 text-lg leading-relaxed">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default LandingPageContent;
