import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

import {
  FaHome,
  FaBook,
  FaChalkboardTeacher,
  FaListUl,
  FaFileAlt,
  FaCalendarAlt,
  FaBullhorn,
  FaChevronDown,
  FaComments,
  FaCog,
} from "react-icons/fa";

export default function Sidebar() {
  const { pathname } = useLocation();
  const { isOpen, toggleSidebar } = useSidebar();

  const [menu, setMenu] = useState({
    classroom: false,
    attendance: false,
    study: false,
    assignment: false,
    exam: false,
  });

  const toggleMenu = (key) =>
    setMenu((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div
      className={`
        fixed top-0 left-0 h-screen shadow-xl 
        transition-all duration-500 z-[200] text-white  

        bg-[radial-gradient(circle_farthest-corner_at_-5.6%_-6.8%,rgba(103,49,145,1)_37.3%,rgba(50,0,129,1)_73.5%)]
        dark:bg-[linear-gradient(180deg,#000,#0b0b0b,#111)]

        ${isOpen ? "w-64" : "w-20"}
      `}
    >
      {/* HEADER — ALWAYS STICKY */}
      <div className="sticky top-0 z-[300] flex justify-between items-center p-4 bg-inherit border-b border-purple-400 dark:border-gray-700">

        <h1 className="font-bold text-lg">
          {isOpen && "JEEVAN ADARSH VIDYALAYA"}
        </h1>

        {/* MENU TOGGLE BUTTON */}
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-10 h-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-7 h-7 text-white"
            fill="currentColor"
          >
            <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/>
          </svg>
        </button>
      </div>

      {/* MENU LIST — ONLY THIS PART SCROLLS */}
      <div className="px-3 mt-2 space-y-2 overflow-y-auto custom-scroll h-[calc(100vh-90px)] pb-20">

        <SidebarLink to="/dashboard" icon={<FaHome />} label="Dashboard" open={isOpen} active={pathname === "/dashboard"} />

        <MenuItem
          label=" Course Management"
          icon={<FaChalkboardTeacher />}
          open={isOpen}
          openMenu={menu.classroom}
          toggle={() => toggleMenu("classroom")}
          items={[{ to: "/create-timetable", label: "Create Time Table" }]}
        />

        <MenuItem
          label="Attendance"
          icon={<FaCalendarAlt />}
          open={isOpen}
          openMenu={menu.attendance}
          toggle={() => toggleMenu("attendance")}
          items={[{ to: "/attendance", label: "Attendance" }]}
        />

        <MenuItem
          label="Study Material"
          icon={<FaBook />}
          open={isOpen}
          openMenu={menu.study}
          toggle={() => toggleMenu("study")}
          items={[
            { to: "/lesson", label: "Lesson" },
            { to: "/topic", label: "Topic" },
          ]}
        />

        <MenuItem
          label="Assignment"
          icon={<FaFileAlt />}
          open={isOpen}
          openMenu={menu.assignment}
          toggle={() => toggleMenu("assignment")}
          items={[
            { to: "/create-assignment", label: "Assignment Create" },
            { to: "/assignment-view", label: "Assignment View" },
          ]}
        />

        <MenuItem
          label="Examination"
          icon={<FaListUl />}
          open={isOpen}
          openMenu={menu.exam}
          toggle={() => toggleMenu("exam")}
          items={[{ to: "/exams", label: "Exam" }]}
        />

        <SidebarLink
          to="/admit-card"
          icon={<FaFileAlt />}
          label="Admit Card"
          open={isOpen}
          active={pathname === "/admit-card"}
        />

        <SidebarLink to="/announcements" icon={<FaBullhorn />} label="Announcements" open={isOpen} active={pathname === "/announcements"} />
        <SidebarLink to="/chat" icon={<FaComments />} label="Chat App" open={isOpen} active={pathname === "/chat"} />
        <SidebarLink to="/settings" icon={<FaCog />} label="Settings" open={isOpen} active={pathname === "/settings"} />

      </div>
    </div>
  );
}

/* SIDEBAR LINK */
function SidebarLink({ to, icon, label, open, active }) {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-3 p-3 rounded-lg transition text-white
        ${active ? "bg-purple-700/60 dark:bg-[#222]" : "hover:bg-purple-700/40 dark:hover:bg-[#1a1a1a]"}
      `}
    >
      <span className="text-white text-lg">{icon}</span>
      {open && label}
    </Link>
  );
}

/* COLLAPSIBLE MENU */
function MenuItem({ label, icon, open, openMenu, toggle, items }) {
  return (
    <div>
      <button
        onClick={toggle}
        className="flex w-full justify-between items-center p-3 rounded-lg hover:bg-purple-700/40 dark:hover:bg-[#1a1a1a] transition text-white"
      >
        <span className="flex items-center gap-3">
          <span className="text-white text-lg">{icon}</span>
          {open && label}
        </span>

        {open && (
          <FaChevronDown className={`transition text-white ${openMenu ? "rotate-180" : ""}`} />
        )}
      </button>

      {openMenu && open && (
        <div className="ml-10 mt-2 space-y-2 text-sm">
          {items.map((item) => (
            <Link key={item.to} to={item.to} className="block hover:underline text-white/90">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
