import React from "react";
import Logo from "../../Assets/Images/Logo"; // Ensure this is the correct path to your logo
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D47A1] via-[#1976D2] to-[#2196F3] flex flex-col items-center justify-center text-white">
      {/* Logo Section */}
      <header className="text-center mb-12 flex justify-center items-center flex-col">
        <div className="rounded-full flex items-center justify-center mb-6">
          <Logo /> {/* Replace with your logo */}
        </div>
        <h1 className="text-5xl font-extrabold tracking-wide">
          Welcome To Travelta
        </h1>
        <p className="text-lg mt-4 max-w-2xl mx-auto">
          Your gateway to seamless collaboration and opportunities.
        </p>
      </header>

      {/* Signup Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-6">

        {/* Agent Signup Button */}
        <Link to="sign_agent" className="text-center bg-white text-[#0D47A1] py-4 px-4 rounded-xl shadow-lg text-lg font-semibold hover:scale-105 transform transition duration-300 focus:outline-none focus:ring-4">
          Agent Signup
        </Link>
     
        {/* Supplier Signup Button */}
        <Link to="sign_supplier" className="text-center bg-white text-[#0D47A1] py-4 px-4 rounded-xl shadow-lg text-lg font-semibold hover:scale-105 transform transition duration-300 focus:outline-none focus:ring-4">
          Supplier Signup
        </Link>
        
        {/* Affiliate Signup Button */}
        <Link to="sign_affiliate" className="text-center bg-white text-[#0D47A1] py-4 px-4 rounded-xl shadow-lg text-lg font-semibold hover:scale-105 transform transition duration-300 focus:outline-none focus:ring-4">
          Affiliate Signup
        </Link>

        {/* Freelance Signup Button */}
        <Link to="sign_freelance" className="text-center bg-white text-[#0D47A1] py-4 px-4 rounded-xl shadow-lg text-lg font-semibold hover:scale-105 transform transition duration-300 focus:outline-none focus:ring-4">
          Freelance Signup
        </Link>
        
      </div>

      {/* Login Button */}
      <div className="mt-12">
        <Link to="login" className="text-center bg-white text-[#0D47A1] py-4 px-12 rounded-full shadow-lg text-lg font-bold hover:scale-105 transform transition duration-300 focus:outline-none focus:ring-4">
          Login
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
