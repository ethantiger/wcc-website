import React from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "About Us", href: "/about" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
  { name: "Login", href: "/login" },
];

const Navbar: React.FC = () => (
  <nav className="fixed 2xl:top-4 2xl:left-1/2 2xl:transform 2xl:-translate-x-1/2 z-50 2xl:w-auto w-full">
    <div className="bg-black 2xl:rounded-full px-4 py-2 flex justify-center items-center shadow-lg">
      <ul className="flex flex-col gap-2 md:flex-row md:gap-4">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="block px-6 py-2 rounded-full text-white font-medium hover:bg-gray-700 transition-colors duration-200 text-center"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export default Navbar;