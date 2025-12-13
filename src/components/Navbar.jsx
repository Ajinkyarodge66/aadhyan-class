import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

export default function Navbar() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);

  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <nav
      className={`
        w-full flex justify-between items-center 
        px-8 py-4 
        bg-white/70 dark:bg-[#111]/70 backdrop-blur-lg
        border-b border-gray-300 dark:border-gray-800
        transition-all duration-300
        sticky top-0 z-[100]
        ${scrolled ? "shadow-lg dark:shadow-gray-900/40" : "shadow-sm"}
      `}
    >

      {/* LEFT SIDE → Title Only (Hamburger Removed ✔) */}
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Wims Teacher Panel
        </h2>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setDark(!dark)}
          className="text-xl p-2 rounded-full
          bg-gray-200 dark:bg-gray-700
          text-gray-900 dark:text-gray-100
          hover:scale-110 transition"
        >
          {dark ? <BsSun /> : <BsMoon />}
        </button>

        <div
          className="relative flex items-center gap-3 cursor-pointer"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <p className="text-gray-700 dark:text-gray-200">
            Welcome, ROSHNI !
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            className="w-10 h-10 rounded-full ring-2 ring-blue-400 dark:ring-blue-600"
            alt="profile"
          />

          {openDropdown && (
            <div
              className="absolute right-0 top-12 bg-white dark:bg-[#1a1a1a]
              w-48 rounded-xl shadow-xl border dark:border-gray-700 p-1"
            >
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Profile
              </button>

              <button
                onClick={() => navigate("/settings")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Settings
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  navigate("/login");
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
