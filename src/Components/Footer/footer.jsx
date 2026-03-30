import React from 'react';

const Footer = () => {
  return (
  <div className="py-0 text-center text-sm bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 text-white min-h-0 bottom-0 top-0">

  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center">

    <h2 className="text-lg sm:text-xl font-semibold mb-2">
      Task<span className="text-yellow-300">Zen</span>
    </h2>

    <p className="text-blue-100 text-sm mb-3">
      Simplify your tasks. Amplify your productivity.
    </p>

    <p className="text-xs text-blue-200">
      © 2026 TaskZen. All rights reserved.
    </p>

  </div>

</div>
  );
};

export default Footer;