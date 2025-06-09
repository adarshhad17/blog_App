import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleMyPostsClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/myposts");
    } else {
      alert("⚠️ Please login first to access your posts.");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-extrabold mb-6">Welcome to MiniBlog</h1>
      <p className="text-xl max-w-xl mb-12">
        Got something to say? The world is listening.
      </p>

      <button
        onClick={handleMyPostsClick}
        className="flex items-center space-x-3 bg-purple-600 hover:bg-purple-700 transition px-8 py-4 rounded-full text-xl font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-500"
        aria-label="Go to My Posts"
      >
        <span>Go to Your Blogs </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Home;
