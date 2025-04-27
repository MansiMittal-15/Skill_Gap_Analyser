import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function AnalyseForm() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-blue-500/20 backdrop-blur-2xl shadow-2xl rounded-md w-full max-w-md p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Required Data for Analysis
          </h1>
          <form className="space-y-4">
            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                placeholder="e.g., shirt, pants"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* subcategory */}
            <div>
              <label
                htmlFor="subcategory"
                className="block text-sm font-medium text-gray-700"
              >
                SubCategory
              </label>
              <input
                type="text"
                id="subcategory"
                placeholder="e.g., parachute pants, trouser pants"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Fabric */}
            <div>
              <label
                htmlFor="fabric"
                className="block text-sm font-medium text-gray-700"
              >
                Fabric
              </label>
              <input
                type="text"
                id="fabric"
                placeholder="e.g., cotton, polyester"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* color */}
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700"
              >
                Color
              </label>
              <input
                type="text"
                id="color"
                placeholder="e.g., red, blue, black"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* product user */}
            <div>
              <label
                htmlFor="productUser"
                className="block text-sm font-medium text-gray-700"
              >
                Product User
              </label>
              <select
                id="productUser"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option hidden>none</option>
                <option value="kids">Kids</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
              {/* <input
              type="text"
              id="fabric"
              placeholder="e.g., cotton, polyester"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            /> */}
            </div>
            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AnalyseForm;
