import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

const faq_questions = [
  {
    question: "What is Skill Gap Analyzer?",
    answer:
      "Skill Gap Analyzer is an AI-powered platform that helps individuals and organizations identify, understand, and bridge skill gaps by providing personalized recommendations and actionable insights.",
  },
  {
    question: "How does Skill Gap Analyzer work?",
    answer:
      "You input your current skills, experience, and goals. Our AI analyzes your profile, benchmarks it against industry standards, and provides a detailed gap analysis with tailored recommendations for courses, certifications, and resources.",
  },
  {
    question: "Who can use Skill Gap Analyzer?",
    answer:
      "Anyone looking to upskill or reskill can use Skill Gap Analyzer—students, professionals, teams, and organizations alike.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard security practices to ensure your data is safe and confidential.",
  },
  {
    question: "How often should I update my profile?",
    answer:
      "We recommend updating your profile whenever you acquire new skills or certifications to get the most accurate recommendations.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! You can get started with a free trial and explore the platform's features before upgrading to a premium plan.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-14 mx-auto">
        <div className="flex flex-col items-center w-full gap-4">
          <h1 className="text-5xl sm:text-4xl font-extrabold text-gray-900 mb-2 text-center">Frequently Asked Questions</h1>
          <p className="text-center text-lg text-gray-500 max-w-2xl">
            Find answers to common questions about Skill Gap Analyzer, our features, and how to get the most out of your upskilling journey.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {faq_questions.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08 + 0.1}s` }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-xl font-semibold text-gray-800 dark:text-gray-100">{faq.question}</span>
                {openIndex === index ? (
                  <MinusIcon className="h-6 w-6 text-blue-600" />
                ) : (
                  <PlusIcon className="h-6 w-6 text-blue-600" />
                )}
              </button>
              <div
                className={`px-6 pb-5 text-gray-600 dark:text-gray-300 text-base transition-all duration-300 ${openIndex === index ? 'block' : 'hidden'}`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUpFAQ 0.6s forwards;
        }
        @keyframes fadeInUpFAQ {
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQs;
