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

  useEffect(() => {
    if (!selectedClass || !selectedSection) return;

    const key = selectedClass + selectedSection;
    const data = attendanceDB[key];
    if (!data) return;

    let dataset;

    if (filter === "day") {
      dataset = {
        labels: data.dayWise.map((d) => d.day),
        datasets: [
          {
            label: "Present",
            data: data.dayWise.map((d) => d.present),
            backgroundColor: "#4ade80",
          },
          {
            label: "Absent",
            data: data.dayWise.map((d) => d.absent),
            backgroundColor: "#f87171",
          },
        ],
      };
    }

    if (filter === "month") {
      dataset = {
        labels: data.monthWise.map((d) => d.month),
        datasets: [
          {
            label: "Present",
            data: data.monthWise.map((d) => d.present),
            backgroundColor: "#60a5fa",
          },
          {
            label: "Absent",
            data: data.monthWise.map((d) => d.absent),
            backgroundColor: "#fbbf24",
          },
        ],
      };
    }

    if (filter === "year") {
      dataset = {
        labels: data.yearWise.map((d) => d.year),
        datasets: [
          {
            label: "Present",
            data: data.yearWise.map((d) => d.present),
            backgroundColor: "#a78bfa",
          },
          {
            label: "Absent",
            data: data.yearWise.map((d) => d.absent),
            backgroundColor: "#fb7185",
          },
        ],
      };
    }

    setChartData(dataset);
  }, [filter, selectedClass, selectedSection]);

  return (
    <>
      <div className="flex flex-col gap-8">

        {/* FILTER BUTTONS */}
        <div className="flex justify-center gap-6 mt-4 text-lg font-medium">
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "day" ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilter("day")}
          >
            Day Wise
          </button>

          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "month" ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilter("month")}
          >
            Month Wise
          </button>

          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "year" ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilter("year")}
          >
            Year Wise
          </button>
        </div>

        {/* SELECT CLASS + SECTION */}
        <div className="flex gap-6 justify-center">
          <select
            className="px-4 py-3 border rounded-lg"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>

          <select
            className="px-4 py-3 border rounded-lg"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>

        {/* GRAPH */}
        <div className="bg-white shadow-xl rounded-2xl p-10 w-[92%] mx-auto">
          <h2 className="text-center text-xl font-semibold mb-8">
            Attendance Overview ({filter.toUpperCase()})
          </h2>

          {chartData ? (
            <Bar data={chartData} />
          ) : (
            <p className="text-center text-gray-500">Select Class & Section</p>
          )}
        </div>
      </div>
    </>
  );
}
