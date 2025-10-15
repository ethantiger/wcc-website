import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";
import { devTesting } from "@/config";
import { IconMenu2, IconX } from "@tabler/icons-react";

import wccLogo from "@/assets/WCC-logo-symbol.png";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Events", href: "#events" },
  { name: "Pricing", href: "#pricing" },
  // { name: "History", href: "#history" },
  { name: "Contact", href: "#contact" },
  { name: "Gallery", href: "/gallery" },
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
        className={`bg-black/80 backdrop-blur-md shadow-2xl rounded-xl border border-purple-500/20 transition-all duration-300 flex flex-col items-center md:flex-row md:justify-center ${
          open
            ? "px-6 py-3 justify-center md:items-center shadow-purple-500/20"
            : "md:rounded-full px-6 py-3 hover:border-purple-400/40"
        }`}
      >
        {/* Nav links: always visible on md+, toggled on <md */}
        <ul
          className={`flex flex-col gap-4 md:flex-row md:gap-4 w-full ${
            open ? "flex justify-center items-center h-full" : "hidden"
          } md:flex md:h-auto md:w-auto`}
        >
            <li className="w-full md:w-[90px]">
            <Link
              to="/"
              onClick={() => {window.scrollTo({ top: 0 })}}
              className="block px-6 py-3 rounded-full text-white font-medium hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-fuchsia-600/30 transition-all duration-200 text-center hover:cursor-pointer group"
            >
              <img src={wccLogo} alt="WCC Logo" className="h-6 mx-auto group-hover:scale-110 transition-transform duration-200" />
            </Link>
            </li>
          {navLinks.map((link) => (
            <li key={link.name} className="w-full md:w-auto">
              {link.href.startsWith("/") ? (
                <Link
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-3 rounded-full font-medium text-center transition-all duration-200 hover:cursor-pointer
                    ${
                      link.name === "Gallery"
                        ? "bg-white text-black hover:bg-gray-200"
                        : "text-white hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-fuchsia-600/30 hover:text-purple-100"
                    }`}
                >
                  {link.name}
                </Link>
              ) : (
              <a
                href={link.href}
                onClick={handleLinkClick}
                className="block px-6 py-3 rounded-full text-white font-medium hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-fuchsia-600/30 hover:text-purple-100 transition-all duration-200 text-center hover:cursor-pointer"
              >
                {link.name}
              </a>
            )}
            </li>
          ))}
          {devTesting && (
            <li className="w-full md:w-auto">
              {user ? (
                <Link
                  to="/dashboard/carpool"
                  className="block px-6 py-3 rounded-full text-black bg-gradient-to-r from-amber-50 to-yellow-100 font-medium hover:from-amber-100 hover:to-yellow-200 hover:shadow-lg transition-all duration-200 text-center"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block px-6 py-3 rounded-full text-black bg-gradient-to-r from-amber-50 to-yellow-100 font-medium hover:from-amber-100 hover:to-yellow-200 hover:shadow-lg transition-all duration-200 text-center"
                >
                  Login
                </Link>
              )}
            </li>
          )}
        </ul>
        {/* Hamburger button for <md screens */}
        <button
          className={`md:hidden w-full flex flex-col justify-center items-center px-6 py-3 rounded-full bg-transparent text-white focus:outline-none shadow-none transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-fuchsia-600/20 ${open ? 'mt-3': ''}`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <div className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
            {open ? <IconX /> : <IconMenu2 />}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;