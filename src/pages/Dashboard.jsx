import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showSection, setShowSection] = useState("");

  const cards = [
    {
      title: "Subjects",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135679.png",
      onClick: () => navigate("/create-lesson"),

      // ⭐ PREMIUM PURPLE GRADIENT
      bg: "from-[#3A0F54] via-[#5A1E6F] to-[#7E3AA1] dark:from-[#2a1d2e] dark:via-[#36263d] dark:to-[#4b2c52]"
    },
    {
      title: "Classes",
      img: "https://cdn-icons-png.flaticon.com/512/201/201818.png",
      onClick: () => navigate("/classes"),

      // ⭐ TEAL → AQUA MODERN
      bg: "from-[#005F5E] via-[#007F76] to-[#00A396] dark:from-[#10352e] dark:via-[#0f4a3d] dark:to-[#0b5c52]"
    },
    {
      title: "Time Table",
      img: "https://cdn-icons-png.flaticon.com/512/3039/3039436.png",
      onClick: () => navigate("/create-timetable"),

      // ⭐ COPPER ORANGE THEME
      bg: "from-[#5C2D0A] via-[#A04915] to-[#D46A20] dark:from-[#443014] dark:via-[#663d1a] dark:to-[#8a4e26]"
    },
    {
      title: "Assignment Progress",
      img: "https://cdn-icons-png.flaticon.com/512/3131/3131646.png",
      onClick: () => setShowSection("progress"),

      // ⭐ BLUE → CYAN MODERN UI
      bg: "from-[#004F8C] via-[#0077B6] to-[#00A3FF] dark:from-[#0d3557] dark:via-[#0c4b67] dark:to-[#0a5e73]"
    },
  ];

  return (
    <>
      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-6 px-6">

        {cards.map((card) => (
          <div
            key={card.title}
            onClick={card.onClick}
            className={`
              cursor-pointer bg-gradient-to-br ${card.bg}
              rounded-3xl shadow-xl p-6 text-center 
              transition-all duration-300 min-h-[150px]
              flex flex-col items-center justify-center

              hover:scale-[1.08] 
              hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]
              dark:hover:shadow-[0_0_30px_rgba(0,255,255,0.45)]

              active:scale-95 active:shadow-inner
              dark:text-white text-gray-100
              font-semibold tracking-wide

              border border-transparent 
              hover:border-white/30 dark:hover:border-cyan-400/40
            `}
          >
            <img 
              src={card.img} 
              alt="" 
              className="w-16 h-16 mb-3 drop-shadow-lg dark:invert-[0.1]" 
            />

            <h3 className="text-xl">{card.title}</h3>
          </div>
        ))}

      </div>

      {/* Assignment Progress Section */}
      <div className="mt-12 px-8">
        {showSection === "progress" && <AssignmentProgress />}
      </div>
    </>
  );
}


/* -----------------------------
   ASSIGNMENT PROGRESS SECTION
-------------------------------- */
function AssignmentProgress() {
  const [tab, setTab] = useState("submitted");

  return (
    <div className="dark:text-white">
      <h2 className="text-3xl font-bold mb-6">Assignment Progress</h2>

      {/* TABS */}
      <div className="flex gap-4 mb-6">
        <TabButton tab={tab} setTab={setTab} id="submitted" label="Submitted" />
        <TabButton tab={tab} setTab={setTab} id="pending" label="Pending" />
        <TabButton tab={tab} setTab={setTab} id="progress" label="Progress" />
      </div>

      {/* TAB CONTENT */}
      <div className="p-6 bg-gray-100 dark:bg-[#1a1a1a] rounded-xl shadow-md">
        {tab === "submitted" && (
          <div>
            <h3 className="text-xl font-semibold mb-3">Submitted Assignments</h3>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
              <li>Science – Chapter 1 completed by 40 students</li>
              <li>Maths Worksheet – Submitted by 32 students</li>
            </ul>
          </div>
        )}

        {tab === "pending" && (
          <div>
            <h3 className="text-xl font-semibold mb-3">Pending Assignments</h3>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
              <li>History Notes – 18 pending</li>
              <li>Algebra Worksheet – 12 pending</li>
            </ul>
          </div>
        )}

        {tab === "progress" && (
          <div>
            <h3 className="text-xl font-semibold mb-3">Overall Progress</h3>

            <div className="w-full bg-gray-300 dark:bg-gray-700 h-4 rounded-full">
              <div
                className="bg-green-500 dark:bg-green-400 h-full rounded-full"
                style={{ width: "68%" }}
              ></div>
            </div>

            <p className="mt-2 text-gray-700 dark:text-gray-300 font-medium">
              68% Completed
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* -----------------------------
      TAB BUTTON COMPONENT
-------------------------------- */
function TabButton({ tab, setTab, id, label }) {
  return (
    <button
      onClick={() => setTab(id)}
      className={`
        px-4 py-2 rounded-lg font-medium 
        transition-all dark:text-white

        ${tab === id
          ? "bg-blue-600 text-white dark:bg-cyan-600"
          : "bg-gray-200 dark:bg-[#222] dark:text-gray-300"}
      `}
    >
      {label}
    </button>
  );
}
