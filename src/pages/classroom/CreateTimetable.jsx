import { useState } from "react";
import { timetableData } from "../../data/timetable";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const courses = ["Diploma", "BTech / BE", "MTech"];
const branches = ["CSE", "ME", "CE"];
const batches = ["Batch 2024", "Batch 2025", "Morning Batch", "Evening Batch"];

const timeSlots = [
  { start: "08:00 AM", end: "08:40 AM", label: "P1" },
  { start: "08:40 AM", end: "09:20 AM", label: "P2" },
  { start: "09:20 AM", end: "10:00 AM", label: "P3" },
  { start: "10:00 AM", end: "10:20 AM", label: "Break" },
  { start: "10:20 AM", end: "11:00 AM", label: "P4" },
  { start: "11:00 AM", end: "11:40 AM", label: "P5" },
  { start: "11:40 AM", end: "12:20 PM", label: "P6" },
  { start: "12:20 PM", end: "01:00 PM", label: "Lunch" },
  { start: "01:00 PM", end: "01:40 PM", label: "P7" },
  { start: "01:40 PM", end: "02:20 PM", label: "P8" },
  { start: "02:20 PM", end: "03:00 PM", label: "P9" },
  { start: "03:00 PM", end: "03:40 PM", label: "P10" },
  { start: "03:40 PM", end: "04:00 PM", label: "Wrap" },
];

export default function CreateTimetable() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [rows, setRows] = useState([]);
  const [show, setShow] = useState(false);

  // SHOW TIMETABLE CLICK
  const handleShow = () => {
    if (!selectedCourse || !selectedBranch || !selectedBatch) {
      alert("Please select Course, Branch and Batch");
      return;
    }

    const key = `${selectedCourse}-${selectedBranch}-${selectedBatch}`;
    setRows(timetableData[key] || []);
    setShow(true);
  };

  // get subject for time + day
  const getSubject = (start, day) => {
    const row = rows.find((r) => r.start === start);
    return row ? row[day] || "-" : "-";
  };

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl bg-white dark:bg-[#0F0020]">

      {/* ================= FILTERS ================= */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="border px-3 py-2 rounded-lg dark:bg-[#1A0030]"
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="border px-3 py-2 rounded-lg dark:bg-[#1A0030]"
        >
          <option value="">Select Branch</option>
          {branches.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="border px-3 py-2 rounded-lg dark:bg-[#1A0030]"
        >
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <button
          onClick={handleShow}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          SHOW TIMETABLE
        </button>
      </div>

      {/* ================= MESSAGE BEFORE SHOW ================= */}
      {!show && (
        <div className="text-center mt-8 text-gray-500 italic">
          Please select <b>Course</b>, <b>Branch</b> and <b>Batch</b> and click{" "}
          <b>SHOW TIMETABLE</b>
        </div>
      )}

      {/* ================= TIMETABLE ================= */}
      {show && (
        <div className="overflow-x-auto border rounded-xl dark:border-gray-700">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-teal-700 text-white text-center">
                <th>Start</th>
                <th>End</th>
                <th>Period</th>
                {days.map((d) => (
                  <th key={d}>{d}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {timeSlots.map((slot, i) => (
                <tr key={i} className="text-center border-b dark:border-gray-700">
                  <td>{slot.start}</td>
                  <td>{slot.end}</td>
                  <td className="font-semibold">{slot.label}</td>

                  {days.map((day) => (
                    <td
                      key={day}
                      className={
                        slot.label === "Lunch" || slot.label === "Break"
                          ? "bg-gray-200 dark:bg-[#1E003A] font-semibold"
                          : ""
                      }
                    >
                      {slot.label === "Lunch"
                        ? "🍽 Lunch"
                        : slot.label === "Break"
                        ? "☕ Break"
                        : getSubject(slot.start, day)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

