import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
   <div className="bg-linear-to-br py-0 from-blue-500 via-indigo-550 to-purple-600 text-white min-h-dvh flex items-center justify-center px-4">

  <div className="text-center max-w-3xl">

    {/* Heading */}
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
      Organize Your Life with <span className="text-yellow-300">TaskZen</span>
    </h1>

    {/* Subtext */}
    <p className="text-sm sm:text-base md:text-lg text-blue-100 mb-6">
      Stop forgetting tasks and start achieving goals.  
      TaskZen helps you stay focused, track progress, and get things done — faster and smarter.
    </p>

    {/* Extra Content */}
    <p className="text-xs sm:text-sm text-blue-200 mb-8">
      ✔ Simple & clean interface  
      ✔ Real-time task tracking  
      ✔ Secure cloud storage  
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row justify-center gap-4">

      <Link to="/signup" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:scale-105 transition-all">
        🚀 Get Started Free
      </Link>

      <Link to='/login' className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all">
        🔐 Login
      </Link>

    </div>

  </div>
</div>
  );
};

export default HeroSection;