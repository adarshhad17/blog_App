import React from 'react';
import { Link } from 'react-router-dom';

function NoPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-extrabold text-violet-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Page not found</h2>
      <p className="text-gray-400 mb-6 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved. Please check the URL or go back to the homepage.
      </p>
      <Link
        to="/home"
        className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NoPage;
