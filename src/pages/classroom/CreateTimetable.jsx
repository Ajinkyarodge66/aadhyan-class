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

  const [openInfo, setOpenInfo] = useState(false); // MODAL STATE

  // SHOW TIMETABLE
  const handleShow = () => {
    if (!selectedCourse || !selectedBranch || !selectedBatch) {
      alert("Please select Course, Branch and Batch");
      return;
    }

    const key = `${selectedCourse}-${selectedBranch}-${selectedBatch}`;
    setRows(timetableData[key] || []);
    setShow(true);
  };

  // Get subject
  const getSubject = (start, day) => {
    const row = rows.find((r) => r.start === start);
    return row ? row[day] || "-" : "-";
  };

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl bg-white dark:bg-[#0F0020]">

      {/* ===== TOP RIGHT INFO BUTTON ===== */}
      <div className="flex justify-end">
        <button
          onClick={() => setOpenInfo(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full 
                     bg-gradient-to-br from-teal-600 to-teal-700 
                     text-white text-xl font-bold shadow-md 
                     hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          ℹ️
        </button>
      </div>

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

      {/* ================= BEFORE SHOW MESSAGE ================= */}
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

      {/* ================= INFO MODAL ================= */}
      {openInfo && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm 
                        flex items-center justify-center z-50 animate-backdropFade">

          <div className="bg-white dark:bg-[#140028] rounded-2xl shadow-2xl 
                          w-[90%] max-w-lg p-6 border border-gray-200 
                          dark:border-gray-700 animate-modalSlideUp">

            <h1 className="text-2xl font-bold text-teal-700 dark:text-teal-300 mb-4">
              How to Use Timetable Panel
            </h1>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">

              <p>
                This panel helps you generate a timetable based on selected 
                <b> Course</b>, <b> Branch</b>, and <b> Batch</b>.
              </p>

              <div>
                <h3 className="font-semibold text-lg text-teal-700 dark:text-teal-300">1️⃣ Select Course</h3>
                <p>Choose Diploma / BTech / MTech.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-teal-700 dark:text-teal-300">2️⃣ Select Branch</h3>
                <p>Choose CSE, ME, CE or any department.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-teal-700 dark:text-teal-300">3️⃣ Select Batch</h3>
                <p>Select Batch 2024, Batch 2025, Morning or Evening.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-teal-700 dark:text-teal-300">4️⃣ Click "SHOW TIMETABLE"</h3>
                <p>Timetable will appear with all weekday periods.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-teal-700 dark:text-teal-300">📘 Understanding Periods</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>P1 starts at 08:00 AM</li>
                  <li>Break & Lunch auto-highlighted</li>
                  <li>P7–P10 afternoon periods</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-teal-700 dark:text-teal-300">📝 Editing Timetable</h3>
                <p>Admin can update timetable inside <b>timetableData</b>.</p>
              </div>

            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setOpenInfo(false)}
                className="px-6 py-2 bg-teal-600 hover:bg-teal-700 
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


