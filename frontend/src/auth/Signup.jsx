import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaSpinner,
  FaUserPlus,
} from "react-icons/fa";
import Header from "../components/Header";
import { register } from "../utils/api";
import { toast } from "react-hot-toast";
import Footer from "../components/Footer";

const Signup = () => {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      const response = await register(user);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      }
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message ? error?.response?.data?.message : error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <>
      <Header />
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-teal-100 overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 via-purple-400 to-teal-300 opacity-30 rounded-full blur-3xl animate-pulse-slow -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-green-300 via-blue-200 to-purple-300 opacity-20 rounded-full blur-2xl animate-pulse-slow -z-10"></div>
        <div className="w-full max-w-md mx-auto p-8 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-lg border border-gray-200 flex flex-col gap-8 animate-fade-in-up relative z-10">
          <div className="flex flex-col items-center gap-2">
            <FaUserPlus className="text-blue-700 text-4xl" />
            <h1 className="text-4xl font-extrabold text-gray-900 mb-1">
              <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-teal-400 bg-clip-text text-transparent">Create an Account!</span>
            </h1>
            <p className="text-base text-gray-500">Welcome! Enter your details to start your journey.</p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 font-semibold">
              <label htmlFor="fullname" className="text-gray-700">Full Name</label>
              <input
                type="text"
                className="outline-none rounded-xl p-3 bg-white/90 border border-gray-300 focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter your fullname..."
                id="fullname"
                name="fullname"
                value={user.fullname}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2 font-semibold">
              <label htmlFor="email" className="text-gray-700">Email</label>
              <input
                type="email"
                className="outline-none rounded-xl p-3 bg-white/90 border border-gray-300 focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter your email..."
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2 font-semibold">
              <label htmlFor="phoneNumber" className="text-gray-700">Phone Number</label>
              <input
                type="text"
                className="outline-none rounded-xl p-3 bg-white/90 border border-gray-300 focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter your phone number..."
                id="phoneNumber"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2 font-semibold relative">
              <label htmlFor="password" className="text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="outline-none rounded-xl p-3 bg-white/90 border border-gray-300 focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter your password..."
                id="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
              />
              <span
                className="absolute right-3 top-14 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400 text-lg" />
                ) : (
                  <FaEye className="text-gray-400 text-lg" />
                )}
              </span>
            </div>
            <button
              onClick={handleSignup}
              className="w-full py-3 rounded-xl text-lg font-bold bg-gradient-to-r from-blue-700 to-purple-600 text-white shadow-lg hover:from-blue-800 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  Signing Up... <FaSpinner className="animate-spin" />
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
            <button className="w-full py-3 rounded-xl text-lg font-semibold bg-white/80 border border-gray-300 text-gray-700 flex items-center justify-center gap-2 shadow hover:bg-blue-50 transition-all duration-200">
              <FaGoogle /> Sign up with Google
            </button>
          </div>
          <div className="text-center text-gray-600">
            Already have an Account?{' '}
            <Link to="/login" className="text-blue-700 font-semibold hover:underline">Sign in</Link>
          </div>
        </div>
        <style>{`
          .animate-fade-in-up {
            opacity: 0;
            transform: translateY(40px);
            animation: fadeInUpSignup 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.1s forwards;
          }
          @keyframes fadeInUpSignup {
            to {
              opacity: 1;
              transform: none;
            }
          }
          .animate-pulse-slow {
            animation: pulseSlow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulseSlow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
