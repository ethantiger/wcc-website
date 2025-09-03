import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";
import { devTesting } from "@/config";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Events", href: "#events" },
  // { name: "History", href: "#history" },
  { name: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
    }
  }

  return (
    <nav className="fixed left-4 md:left-1/2 md:top-4 md:transform md:-translate-x-1/2 z-50 w-auto flex justify-center bottom-4 md:bottom-auto">
      <div
        className={`bg-black shadow-lg rounded-xl transition-all duration-300 flex flex-col items-center md:flex-row md:justify-center ${
          open
            ? "px-6 py-3 justify-center md:items-center"
            : "md:rounded-full px-6 py-3"
        }`}
      >
        {/* Nav links: always visible on md+, toggled on <md */}
        <ul
          className={`flex flex-col gap-4 md:flex-row md:gap-4 w-full ${
            open ? "flex justify-center items-center h-full" : "hidden"
          } md:flex md:h-auto md:w-auto`}
        >
          <li className="w-full md:w-auto">
            <Link
              to="/"
              onClick={() => {window.scrollTo({ top: 0 })}}
              className="block px-6 py-3 rounded-full text-white font-medium hover:bg-gray-700 transition-colors duration-200 text-center hover:cursor-pointer"
            >
              Home
            </Link>
          </li>
          {navLinks.map((link) => (
            <li key={link.name} className="w-full md:w-auto">
              <a
                href={link.href}
                onClick={handleLinkClick}
                className="block px-6 py-3 rounded-full text-white font-medium hover:bg-gray-700 transition-colors duration-200 text-center hover:cursor-pointer"
              >
                {link.name}
              </a>
            </li>
          ))}
          {devTesting && (
            <li className="w-full md:w-auto">
              {user ? (
                <Link
                  to="/dashboard/carpool"
                  className="block px-6 py-3 rounded-full text-black bg-amber-50 font-medium hover:bg-gray-400 transition-colors duration-200 text-center"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block px-6 py-3 rounded-full text-black bg-amber-50 font-medium hover:bg-gray-400 transition-colors duration-200 text-center"
                >
                  Login
                </Link>
              )}
            </li>
          )}
        </ul>
        {/* Hamburger button for <md screens */}
        <button
          className={`md:hidden w-full flex flex-col justify-center items-center px-6 py-3 rounded-full bg-transparent text-white focus:outline-none shadow-none transition-colors duration-200 hover:bg-gray-800 ${open ? 'mt-3': ''}`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <div className="flex flex-col gap-1">
            <div className="w-6 h-0.5 bg-white rounded"></div>
            <div className="w-6 h-0.5 bg-white rounded"></div>
            <div className="w-6 h-0.5 bg-white rounded"></div>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;