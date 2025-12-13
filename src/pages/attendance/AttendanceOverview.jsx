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
    </div>
  );
}

