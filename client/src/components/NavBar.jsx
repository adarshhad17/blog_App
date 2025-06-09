import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
   <nav
  className="fixed top-0 left-0 w-full bg-black px-10 py-6 flex justify-between items-center z-50 
             shadow-[0_0_12px_2px_rgba(139,92,246,0.6)]"
>
      <Link
        to="/home"
        className="text-3xl font-bold text-indigo-500 hover:text-indigo-400 transition-colors duration-300"
      >
        Mini Blog 
      </Link>

      {!token ? (
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 font-medium px-4 py-2 rounded-md border border-transparent hover:border-indigo-400"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 font-medium px-4 py-2 rounded-md border border-transparent hover:border-indigo-400"
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="flex items-center space-x-6 text-gray-300">
          <span className="font-semibold text-indigo-400 tracking-wide">
            Hello, {username || "User"}
          </span>

          <Link
            to="/createpost"
            className="font-medium hover:text-indigo-400 transition-colors duration-300 px-4 py-2 rounded-md border border-transparent hover:border-indigo-400"
          >
            Create Blog
          </Link>

          <Link
            to="/myposts"
            className="font-medium hover:text-indigo-400 transition-colors duration-300 px-4 py-2 rounded-md border border-transparent hover:border-indigo-400"
          >
            My Blogs
          </Link>

          <button
            onClick={handleLogout}
            className="font-medium text-red-500 hover:text-red-400 transition-colors duration-300 px-4 py-2 rounded-md border border-transparent hover:border-red-400"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
