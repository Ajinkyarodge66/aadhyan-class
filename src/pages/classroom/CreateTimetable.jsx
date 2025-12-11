import { useState } from "react";
import { timetableData } from "../../data/timetable";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function CreateTimetable() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [rows, setRows] = useState([]);

  const handleShow = () => {
    if (!selectedClass || !selectedSection) {
      alert("Please select class & section");
      return;
    }
    const key = `${selectedClass}-${selectedSection}`;
    setRows(timetableData[key] || []);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <div className="flex flex-col w-full md:w-1/3">
          <label className="font-semibold mb-1">Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Class</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>
        </div>

        <div className="flex flex-col w-full md:w-1/3">
          <label className="font-semibold mb-1">Select Section</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Section</option>
            <option value="A">A</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleShow}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700"
          >
            SHOW TIMETABLE
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-xl shadow bg-white">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-teal-800 text-white text-center">
              <th className="py-3">Start</th>
              <th>End</th>
              <th>Period</th>
              {days.map((d) => (
                <th key={d}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={3 + days.length}
                  className="py-6 text-center text-gray-600"
                >
                  No timetable available.
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className="text-center border-b">
                  <td className="py-3">{r.start}</td>
                  <td>{r.end}</td>
                  <td>{r.period}</td>
                  {days.map((d) => (
                    <td key={d}>{r[d] || "-"}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


