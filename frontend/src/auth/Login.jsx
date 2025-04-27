import React, { useState } from "react";
import blueImage from "../assets/purple_image.jpeg";
import white_bg from "../assets/white_bg2.jpg";
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
      <div className="max-w-[1200px] mx-auto">
        <div className="mx-[24px] flex my-10 border-2 border-black ">
          <div
            className="w-[50%] flex flex-col items-center justify-center gap-6"
            style={{
              backgroundImage: `url(${white_bg})`,
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <FiLogIn className="text-blue-800 text-4xl" />
              <h1 className="text-4xl font-semibold">Welcome Back!</h1>
              <p className="text-sm">
                Welcome back! Please enter your details.
              </p>
            </div>
            <div className="w-[70%] flex flex-col items-center gap-4 text-sm">
              <div className="flex flex-col w-[80%] gap-2 font-semibold ">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="outline-none rounded-lg p-2 bg-white outline-black/20"
                  placeholder="Enter your email.."
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col w-[80%] gap-2 font-semibold relative justify-center">
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password here.."
                  className="outline-none rounded-lg p-2 outline-black/20"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                />
                <span
                  className="absolute right-2 top-12 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-black/50 text-lg" />
                  ) : (
                    <FaEye className="text-black/50 text-lg" />
                  )}
                </span>
              </div>
              <div className="flex justify-between w-[80%] gap-2 font-semibold ">
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="checkbox" />
                  <label htmlFor="checkbox">Remember for 30 days</label>
                </div>
                <div>
                  <Link to="/" className="font-semibold text-blue-800">
                    Forgot Password
                  </Link>
                </div>
              </div>
              <div className="flex w-[100%] justify-center ">
                <button
                  onClick={handleLogin}
                  className="bg-blue-800 text-white w-[80%] p-2 rounded-lg text-lg hover:bg-blue-900"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2 justify-center">
                      Signing in... <FaSpinner className="animate-spin" />
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
              <div className="flex w-[100%] justify-center ">
                <button className="bg-white/70 border-2 border-black/30 text-black font-semibold w-[80%] p-2 rounded-lg text-lg flex justify-center items-center gap-2">
                  <span>
                    <FaGoogle />
                  </span>
                  Sign in with Google
                </button>
              </div>
            </div>
            <div>
              <div>
                Don't have an Account?{" "}
                <span>
                  <Link to="/signup" className="text-blue-800 font-semibold">
                    Sign up
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="w-[50%]">
            <img src={blueImage} alt="blue image" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
