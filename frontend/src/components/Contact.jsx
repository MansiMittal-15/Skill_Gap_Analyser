import React from "react";
import Header from "./Header";
import { FaInstagram, FaLinkedin, FaLocationArrow, FaMailBulk, FaPhone, FaTwitter } from "react-icons/fa";
import Footer from "./Footer";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="max-w-[1200px] mx-auto">
        <div className="mx-[24px] flex flex-col gap-10 items-center py-10">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-5xl font-semibold">Contact Us</h1>
            <p>Any question or remarks? Just write us a message!</p>
          </div>
          <div className=" w-[100%] flex ">
            <div className="w-[40%] text-white/80 p-8 bg-black/90 rounded-tl-2xl flex flex-col rounded-bl-2xl gap-20 ">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl">Contact Information</h1>
                <p>Say something to start a live chat!</p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex gap-6">
                  <FaPhone className="text-white text-2xl hover:text-blue-800 cursor-pointer" />
                  <div>+1218 3327 238</div>
                </div>
                <div className="flex gap-6">
                  <FaMailBulk className="text-white text-2xl hover:text-blue-800 cursor-pointer" />
                  <div>demo@gmail.com</div>
                </div>
                <div className="flex gap-6 items-center">
                  <FaLocationArrow className="text-white text-3xl hover:text-blue-800 cursor-pointer" />
                  <div>
                    Lorem ipsum dolor, sit amet consect ing elit. Mollitia earum
                    consequatur delectus?
                  </div>
                </div>
              </div>
              <div>
                <ul className="flex gap-6">
                  <li>
                    <FaTwitter className="text-white text-2xl hover:text-blue-800 cursor-pointer" />
                  </li>
                  <li>
                    <FaInstagram className="text-white text-2xl hover:text-blue-800 cursor-pointer" />
                  </li>
                  <li>
                    <FaLinkedin className="text-white text-2xl hover:text-blue-800 cursor-pointer" />
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-[60%] p-8 bg-blue-200 flex flex-col gap-6 rounded-tr-2xl rounded-br-2xl">
              <div className="flex justify-between ">
                <div className="flex flex-col w-[45%] gap-2 font-semibold ">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="outline-none rounded-lg p-2 bg-white "
                    placeholder="Enter your First Name.."
                    id="firstName"
                  />
                </div>
                <div className="flex flex-col w-[45%] gap-2 font-semibold ">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="outline-none rounded-lg p-2 bg-white "
                    placeholder="Enter your Last Name.."
                    id="lastName"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col w-[45%] gap-2 font-semibold ">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="outline-none rounded-lg p-2 bg-white "
                    placeholder="Enter your email.."
                    id="email"
                  />
                </div>
                <div className="flex flex-col w-[45%] gap-2 font-semibold ">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    className="outline-none rounded-lg p-2 bg-white "
                    placeholder="Enter your Phone Number.."
                    id="phoneNumber"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col w-[100%] gap-2 font-semibold ">
                  <label htmlFor="Subject">Subject</label>
                  <input
                    type="text"
                    className="outline-none rounded-lg p-2 bg-white "
                    placeholder="Write your Subject.."
                    id="Subject"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col w-[100%] gap-2 font-semibold ">
                  <label htmlFor="Message">Message</label>
                  <input
                    type="text"
                    className="outline-none rounded-lg p-2 bg-white "
                    placeholder="Write your Message.."
                    id="Message"
                  />
                </div>
              </div>
              <div className="flex w-[100%] justify-center ">
                <button className="bg-blue-700/90 text-white w-[100%] p-2 rounded-lg text-lg hover:bg-blue-800">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
