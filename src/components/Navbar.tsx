import React, { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "About Us", href: "/about" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
  { name: "Login", href: "/login" },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

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
                href={link.href}
                className="block px-6 py-3 rounded-full text-white font-medium hover:bg-gray-700 transition-colors duration-200 text-center"
              >
                {link.name}
              </a>
            </li>
          ))}
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