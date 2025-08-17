import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/", location: 0},
  { name: "About", href: "#about", location: 1},
  { name: "Events", href: "#events", location: 1.5},
  { name: "Resources", href: "#resources", location: 3},
  { name: "Contact", href: "#contact", location: 4},
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (index: number) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      return;
    }

    const container = document.getElementById("scroll-container");
    if (!container) return;
    container.scrollTop = window.innerHeight * index;
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
          {navLinks.map((link) => (
            <li key={link.name} className="w-full md:w-auto">
              <a
                onClick={() => handleClick(link.location)}
                className="block px-6 py-3 rounded-full text-white font-medium hover:bg-gray-700 transition-colors duration-200 text-center hover:cursor-pointer"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="w-full md:w-auto">
            <Link
              to="/login"
              className="block px-6 py-3 rounded-full text-black bg-amber-50 font-medium hover:bg-gray-400 transition-colors duration-200 text-center"
            >
              Login
            </Link>
          </li>
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