import React from "react";

const FAQs = () => {
  const faq_questions = [
    {
      question: "What is Pricer and how does it work?",
      answer:
        "Pricer is an AI-powered price recommendation system that helps startups optimize their product pricing to maximize revenue. It analyzes market trends, competitor pricing, and consumer behavior to suggest the best price points for your products.",
    },
    {
      question: "How can Pricer help my startup increase revenue?",
      answer:
        "By using data-driven insights, Pricer recommends optimal pricing strategies that balance competitiveness and profitability, ensuring you don’t underprice or overprice your products.",
    },
    {
      question: "Does Pricer work for all types of products?",
      answer:
        "Yes! Pricer can analyze and recommend pricing for a wide range of products, from electronics and fashion to SaaS services and digital goods.",
    },
    {
      question: "How does Pricer determine the best price for my product?",
      answer:
        "Pricer uses advanced machine learning algorithms that consider factors such as market demand, competitor pricing, historical sales data, and customer behavior to generate pricing recommendations.",
    },
    {
      question: "Can I integrate Pricer with my e-commerce platform?",
      answer:
        "Yes! Pricer supports integration with popular e-commerce platforms and APIs, making it easy to automate pricing updates and implement recommendations.",
    },
    {
      question: "How often does Pricer update pricing recommendations?",
      answer:
        "The frequency of updates depends on the market dynamics and your business preferences. You can configure Pricer to provide daily, weekly, or real-time pricing suggestions.",
    },
    {
      question: "Is Pricer suitable for small businesses and startups?",
      answer:
        "Absolutely! Pricer is designed to help businesses of all sizes, especially startups looking to establish competitive and profitable pricing strategies.",
    },
    {
      question: "What makes Pricer different from other pricing tools?",
      answer:
        "Unlike standard pricing tools, Pricer leverages AI to analyze competitor pricing, market trends, and demand elasticity, offering strategic insights rather than just static price suggestions.",
    },
  ];
  return (
    <div className="max-w-[1200px] mx-auto py-24 ">
      <div className="flex flex-col gap-16 mx-10">
        <div className="flex justify-center flex-col items-center w-[60%] max-md:w-[100%] mx-auto gap-4 max-lg:w-[80%] max-xl:w-[60%]">
          <h1 className="text-5xl max-md:text-3xl max-sm:text-2xl max-lg:text-3xl max-xl:text-4xl">Frequently Asked Questions</h1>
          <p className="text-center max-md:text-sm max-sm:text-xs max-lg:text-base max-xl:text-lg">
            Get clear, data-driven answers to your pricing questions. Explore
            our FAQ section for insights on optimizing your product pricing and
            maximizing revenue.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {faq_questions.map((faq, index) => (
            <details
              key={index}
              className="bg-blue-200 max-md:text-sm max-sm:text-xs text-blue-800 transition-all duration-1000 translate hover:bg-blue-300 p-4 flex flex-col gap-4 rounded-lg cursor-pointer"
            >
              <summary className="text-2xl max-md:text-sm max-sm:text-xs max-lg:text-base max-xl:text-lg">{faq.question}</summary>
              <p className="mx-6 max-md:text-sm max-sm:text-xs max-lg:text-sm max-xl:text-base">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
