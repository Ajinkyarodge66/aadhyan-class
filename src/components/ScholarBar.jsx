import { useState } from "react";
import { FaBell, FaSearch, FaUserCircle, FaMoon, FaSun } from "react-icons/fa";

export default function ScholarBar({ title = "Dashboard" }) {
  const [darkMode, setDarkMode] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  // Theme Toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header
      className={`w-full px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-50 transition-all duration-300 
        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Left Title */}
      <h1 className="text-2xl font-bold tracking-wide">{title}</h1>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 w-80 shadow-inner">
        <FaSearch className="text-gray-500 dark:text-gray-300" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent dark:text-white outline-none ml-2 w-full text-sm"
        />
      </div>

      {/* Right Items */}
      <div className="flex items-center gap-6 relative">

        {/* Notifications */}
        <button className="relative">
          <FaBell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
            2
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border dark:border-gray-600"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Profile Icon */}
        <div className="relative">
          <FaUserCircle
            size={32}
            className="cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          />

          {/* Dropdown Menu */}
          {openMenu && (
            <div
              className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg border 
              ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
            >
              <ul className="text-sm">
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-red-500">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
