import React, { useEffect, useState } from "react";
import { services } from "../utils/ServicePageContent";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { FaCheckCircle } from "react-icons/fa";
import { Icon } from "@iconify/react";

const ServiceDetails = ({ serviceTitle }) => {
  const serviceData = services[serviceTitle];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl sm:text-3xl text-white font-bold transition-all duration-300 hover:text-blue-100">
            <Link to={"/"} className="flex items-center">
              Skill <span className="text-blue-100 ml-1">Analyser</span>
            </Link>
          </h1>
          <button
            onClick={() => history.back()}
            className="bg-white hover:bg-blue-50 transition-all duration-300 font-semibold px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm"
          >
            <ArrowLeftIcon className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600">Back</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 sm:py-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 font-bold mb-4">
            {serviceTitle}
          </h1>
          <p className="text-xl text-blue-600 font-medium">
            {serviceData.tagline}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed">
            {serviceData.introduction}
          </p>
        </div>

        <section className="py-4 sm:py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <div className="space-y-4">
            {serviceData.howItWorks.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <p className="text-gray-600 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4 font-semibold">
                    {index + 1}
                  </span>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8 sm:py-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Benefits
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {serviceData.benefits.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-sm border flex items-center gap-2 border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <FaCheckCircle className="text-green-600" />
                <p className="text-gray-600">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8 sm:py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Ideal For
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceData.idealFor.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg flex items-center gap-2 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="bg-yellow-50 rounded-full p-2">
                  <Icon
                    icon="tabler:bulb"
                    className="text-yellow-500 text-2xl"
                  />
                </div>{" "}
                <p className="text-gray-600">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8 sm:py-12">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h2 className="text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <span>Pro Tip</span>
              <div className="bg-yellow-50 rounded-full p-2">
                <Icon icon="tabler:bulb" className="text-yellow-500 text-2xl" />
              </div>
            </h2>
            <p className="text-blue-600">{serviceData.proTip}</p>
          </div>
        </section>

        <section className="py-8 sm:py-12 flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            {serviceData.ctaText}
          </button>
        </section>
      </main>
    </div>
  );
};

export default ServiceDetails;
