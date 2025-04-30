import React, { useState } from "react";
import blueImage from "../assets/purple_image.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaSpinner } from "react-icons/fa";
import Header from "../components/Header";
import { FiLogIn } from "react-icons/fi";
import { login } from "../utils/api";
import { useDispatch } from "react-redux";
import { setUser as setUserAction } from "../redux/userSlice.js";
import { toast } from "react-hot-toast";
import Footer from "../components/Footer.jsx";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await login(user);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      }
      dispatch(setUserAction(response?.data?.user));
      if (response?.data?.user?._id) {
        localStorage.setItem('userId', response.data.user._id);
      }
      navigate("/");
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
            <FiLogIn className="text-blue-700 text-4xl" />
            <h1 className="text-4xl font-extrabold text-gray-900 mb-1">
              <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-teal-400 bg-clip-text text-transparent">Welcome Back!</span>
            </h1>
            <p className="text-base text-gray-500">Please enter your details to sign in.</p>
          </div>
          <div className="flex flex-col gap-5">
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
            <div className="flex flex-col gap-2 font-semibold relative">
              <label htmlFor="password" className="text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password here..."
                className="outline-none rounded-xl p-3 bg-white/90 border border-gray-300 focus:ring-2 focus:ring-blue-400 transition"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
              />
              <span
                className="absolute right-3 top-11 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400 text-lg" />
                ) : (
                  <FaEye className="text-gray-400 text-lg" />
                )}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="checkbox" className="accent-blue-600" />
                <label htmlFor="checkbox" className="text-gray-600">Remember for 30 days</label>
              </div>
              <Link to="/" className="font-semibold text-blue-700 hover:underline">Forgot Password?</Link>
            </div>
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-xl text-lg font-bold bg-gradient-to-r from-blue-700 to-purple-600 text-white shadow-lg hover:from-blue-800 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2 justify-center">
                  Signing in... <FaSpinner className="animate-spin" />
                </span>
              ) : (
                "Sign in"
              )}
            </button>
            <button className="w-full py-3 rounded-xl text-lg font-semibold bg-white/80 border border-gray-300 text-gray-700 flex items-center justify-center gap-2 shadow hover:bg-blue-50 transition-all duration-200">
              <FaGoogle /> Sign in with Google
            </button>
          </div>
          <div className="text-center text-gray-600">
            Don't have an Account?{' '}
            <Link to="/signup" className="text-blue-700 font-semibold hover:underline">Sign up</Link>
          </div>
        </div>
        <style>{`
          .animate-fade-in-up {
            opacity: 0;
            transform: translateY(40px);
            animation: fadeInUpLogin 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.1s forwards;
          }
          @keyframes fadeInUpLogin {
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

export default Login;
