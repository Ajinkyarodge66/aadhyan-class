import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
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
  const [open, setOpen] = useState(true);

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
        fixed top-0 left-0
        h-screen
        shadow-xl custom-scroll
        overflow-y-auto
        z-[200]
        transition-all duration-500

        /* LIGHT MODE GRADIENT */
        bg-[radial-gradient(circle_farthest-corner_at_-5.6%_-6.8%,rgba(103,49,145,1)_37.3%,rgba(50,0,129,1)_73.5%)]
        text-white

        /* DARK MODE */
        dark:bg-gradient-to-b
        dark:from-[#000000] dark:via-[#000000] dark:to-[#000000]
        dark:text-gray-200

        ${open ? "w-64" : "w-20"}
      `}
    >

      {/* STICKY HEADER (SCHOOL NAME) */}
      <div
        className="
          sticky top-0 z-[300]
          flex justify-between items-center
          p-4 
          border-b border-purple-400 dark:border-gray-700
          bg-inherit backdrop-blur-sm
        "
      >
        <h1 className="font-bold text-lg leading-tight">
          {open ? "JEEVAN ADARSH VIDYALAYA" : "JAV"}
        </h1>

        <button onClick={() => setOpen(!open)}>
          <FaBars className="text-xl dark:text-gray-300" />
        </button>
      </div>

      {/* MENU LIST */}
      <div className="px-3 mt-4 space-y-2">

        <SidebarLink
          to="/dashboard"
          label="Dashboard"
          icon={<FaHome />}
          open={open}
          active={pathname === "/dashboard"}
        />

        <MenuItem
          label="Classroom Management"
          icon={<FaChalkboardTeacher />}
          isOpen={open}
          openMenu={menu.classroom}
          toggle={() => toggleMenu("classroom")}
          items={[{ to: "/create-timetable", label: "Create Time Table" }]}
        />

        <MenuItem
          label="Attendance"
          icon={<FaCalendarAlt />}
          isOpen={open}
          openMenu={menu.attendance}
          toggle={() => toggleMenu("attendance")}
          items={[{ to: "/attendance", label: "Attendance" }]}
        />

        <MenuItem
          label="Study Material"
          icon={<FaBook />}
          isOpen={open}
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
          isOpen={open}
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
          isOpen={open}
          openMenu={menu.exam}
          toggle={() => toggleMenu("exam")}
          items={[{ to: "/exams", label: "Exam" }]}
        />

        <SidebarLink
          to="/announcements"
          label="Announcements"
          icon={<FaBullhorn />}
          open={open}
          active={pathname === "/announcements"}
        />

        <SidebarLink
          to="/admit-card"
          label="View Admit Card"
          icon={<FaFileAlt />}
          open={open}
          active={pathname === "/admit-card"}
        />

        <SidebarLink
          to="/chat"
          label="Chat App"
          icon={<FaComments />}
          open={open}
          active={pathname === "/chat"}
        />

        <SidebarLink
          to="/settings"
          label="Settings"
          icon={<FaCog />}
          open={open}
          active={pathname === "/settings"}
        />
      </div>
    </div>
  );
}

/* ------------------
 SIDEBAR LINK COMPONENT
------------------- */
function SidebarLink({ to, icon, label, open, active }) {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-3 p-3 rounded-lg transition-all

        ${
          active
            ? "bg-purple-700/60 dark:bg-purple-800/60 text-white"
            : "hover:bg-purple-700/40 dark:hover:bg-purple-800/40"
        }
      `}
    >
      {icon} {open && label}
    </Link>
  );
}

/* ------------------
 COLLAPSIBLE MENU ITEM
------------------- */
function MenuItem({ label, icon, isOpen, openMenu, toggle, items }) {
  return (
    <div>
      <button
        onClick={toggle}
        className="
          flex w-full justify-between items-center
          p-3 rounded-lg
          hover:bg-purple-700/40 dark:hover:bg-purple-800/40
          transition
        "
      >
        <span className="flex items-center gap-3">
          {icon} {isOpen && label}
        </span>

        {isOpen && (
          <FaChevronDown
            className={`transition ${openMenu ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {openMenu && isOpen && (
        <div className="ml-10 mt-2 space-y-2 text-sm">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block hover:underline dark:text-gray-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

