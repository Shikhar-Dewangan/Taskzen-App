import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutBtn from './LogutBtn';


const Header = () => {
  const user = useSelector((state) => state.auth.user);

  console.log("📱 Header - User:", user);
  console.log("📱 Header - Is user logged in?", user ? "YES" : "NO");

  return (
    <div className="bg-linear-to-br from-blue-500 via-indigo-550 to-purple-600 top-0 left-0 w-full z-50 px-4 sm:px-6 py-4 min-h-0">

      <div className="max-w-6xl mx-auto flex justify-between items-center font-bold text-white">

        {/* Logo */}
        <h1 className="text-lg sm:text-xl font-bold tracking-wide">
          Task<span className="text-yellow-300 text-4xl">Zen</span>
        </h1>

        {/* Nav */}
        <div className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base">
          <Link to='/' className="hover:text-yellow-300 transition">  Home</Link>

          {!user && (
            <>
              <Link to='/login' className="hover:text-yellow-300 transition"> Login </Link>
              <Link to='/signup' className="px-3 py-1 sm:px-4 sm:py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition">Signup</Link>
            </>
          )
          }
          {user && (
            <>
            <Link to='/dashboard' className="hover:text-yellow-300 transition"> Dashboard</Link>
            <LogoutBtn />
            </>
          )
          }

        </div>

      </div>

    </div>
  );
};

export default Header;