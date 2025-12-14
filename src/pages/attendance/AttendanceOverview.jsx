import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import attendanceDB from "../../data/attendanceData";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AttendanceOverview() {
  const [filter, setFilter] = useState("day");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [chartData, setChartData] = useState(null);

  const [presentTotal, setPresentTotal] = useState(0);
  const [absentTotal, setAbsentTotal] = useState(0);

  // ⭐ Modal State
  const [openInfo, setOpenInfo] = useState(false);

  // ⭐ REAL-TIME DARK MODE DETECTION  
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // ⭐ Chart Options (updates when theme changes)
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: isDark ? "#fff" : "#000" },
      },
    },
    scales: {
      x: {
        ticks: { color: isDark ? "#fff" : "#000" },
        grid: { color: isDark ? "#555" : "#ddd" },
      },
      y: {
        ticks: { color: isDark ? "#fff" : "#000" },
        grid: { color: isDark ? "#555" : "#ddd" },
      },
    },
  };

  // ⭐ Load data when filters change
  useEffect(() => {
    if (!selectedClass || !selectedSection) return;

    const key = selectedClass + selectedSection;
    const data = attendanceDB[key];
    if (!data) return setChartData(null);

    let labels = [];
    let presentArr = [];
    let absentArr = [];

    if (filter === "day") {
      labels = data.dayWise.map((d) => d.day);
      presentArr = data.dayWise.map((d) => d.present);
      absentArr = data.dayWise.map((d) => d.absent);
    } else if (filter === "month") {
      labels = data.monthWise.map((d) => d.month);
      presentArr = data.monthWise.map((d) => d.present);
      absentArr = data.monthWise.map((d) => d.absent);
    } else {
      labels = data.yearWise.map((d) => d.year);
      presentArr = data.yearWise.map((d) => d.present);
      absentArr = data.yearWise.map((d) => d.absent);
    }

    setPresentTotal(presentArr.reduce((a, b) => a + b, 0));
    setAbsentTotal(absentArr.reduce((a, b) => a + b, 0));

    setChartData({
      labels,
      datasets: [
        {
          label: "Present",
          data: presentArr,
          backgroundColor: isDark ? "#22c55e" : "#4ade80",
        },
        {
          label: "Absent",
          data: absentArr,
          backgroundColor: isDark ? "#f43f5e" : "#f87171",
        },
      ],
    });
  }, [filter, selectedClass, selectedSection, isDark]);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow">

      {/* ===== TOP RIGHT INFO BUTTON ===== */}
      <div className="flex justify-end mb-3">
        <button
          onClick={() => setOpenInfo(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full 
                     bg-gradient-to-br from-indigo-600 to-indigo-700 
                     text-white text-xl font-bold shadow-md 
                     hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          ℹ️
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">Select Course</option>
          <option value="Diploma">Diploma</option>
          <option value="BTechBE">BTech / BE</option>
          <option value="MTech">MTech</option>
        </select>

        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">Select Batch</option>
          <option value="A">Batch A</option>
          <option value="B">Batch B</option>
          <option value="C">Batch C</option>
        </select>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="day">Day Wise</option>
          <option value="month">Month Wise</option>
          <option value="year">Year Wise</option>
        </select>
      </div>

      {/* PRESENT & ABSENT COUNTERS */}
      {chartData && (
        <div className="flex gap-6 mb-4 text-lg font-semibold">
          <p className={isDark ? "text-green-400" : "text-green-600"}>
            Present: {presentTotal}
          </p>
          <p className={isDark ? "text-red-400" : "text-red-600"}>
            Absent: {absentTotal}
          </p>
        </div>
      )}

      {/* CHART */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
        {chartData ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          "Select course & batch to view attendance."
        )}
      </div>

      {/* ================= INFO MODAL ================= */}
      {openInfo && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm 
                        flex items-center justify-center z-50 animate-backdropFade">

          <div className="bg-white dark:bg-[#140028] rounded-2xl shadow-2xl 
                          w-[90%] max-w-lg p-6 border border-gray-200 
                          dark:border-gray-700 animate-modalSlideUp">

            <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
              How to Use Attendance Overview
            </h1>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">

              <p>
                This panel allows you to view <b>Attendance Trends</b> through charts  
                such as Day-wise, Month-wise and Year-wise reports.
              </p>

              <div>
                <h3 className="font-semibold text-lg text-indigo-700 dark:text-indigo-300">
                  1️⃣ Select Course
                </h3>
                <p>Choose Diploma / BTech / MTech.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-indigo-700 dark:text-indigo-300">
                  2️⃣ Select Batch
                </h3>
                <p>Pick Batch A, B, or C depending on class grouping.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-indigo-700 dark:text-indigo-300">
                  3️⃣ Choose Filter Type
                </h3>
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li><b>Day Wise</b> – Daily attendance trends</li>
                  <li><b>Month Wise</b> – Monthly total presence & absence</li>
                  <li><b>Year Wise</b> – Yearly consolidated statistics</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-indigo-700 dark:text-indigo-300">
                  📊 Understanding the Chart
                </h3>
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li>Green Bar → Total Present</li>
                  <li>Red Bar → Total Absent</li>
                  <li>Hover to see exact values</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-indigo-700 dark:text-indigo-300">
                  📝 Data Source
                </h3>
                <p>All attendance data is loaded from <b>attendanceData.js</b>.</p>
              </div>

            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setOpenInfo(false)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 
                           text-white rounded-xl shadow-md"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
