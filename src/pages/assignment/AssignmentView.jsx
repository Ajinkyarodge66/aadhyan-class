import { useState } from "react";

export default function AssignmentView() {
  const [filter, setFilter] = useState({
    teacher: "",
    class: "",
    section: "",
    subject: "",
    assignment: "",
  });

  const classes = ["Nur", "8", "9", "10"];
  const sections = ["A", "B", "C"];
  const subjects = ["Hindi", "English", "Maths", "Science"];
  const teachers = ["Roshni", "Amit", "Priya"];
  const assignments = ["HW 01", "Classwork 02", "Revision Test"];

  const [students] = useState([]); // Empty -> No Data Available

  return (
    <div className="p-6 bg-[#ffe9d6] min-h-screen">

      {/* TITLE */}
      <h2 className="text-3xl font-semibold text-center mb-8 text-[#333]">
        View Assignments
      </h2>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

        {/* Teacher */}
        <select
          className="border p-3 rounded-lg"
          value={filter.teacher}
          onChange={(e) => setFilter({ ...filter, teacher: e.target.value })}
        >
          <option value="">Select Teacher</option>
          {teachers.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Class */}
        <select
          className="border p-3 rounded-lg"
          value={filter.class}
          onChange={(e) => setFilter({ ...filter, class: e.target.value })}
        >
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Section */}
        <select
          className="border p-3 rounded-lg"
          value={filter.section}
          onChange={(e) => setFilter({ ...filter, section: e.target.value })}
        >
          <option value="">Select Section</option>
          {sections.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Subject */}
        <select
          className="border p-3 rounded-lg"
          value={filter.subject}
          onChange={(e) => setFilter({ ...filter, subject: e.target.value })}
        >
          <option value="">Select Subject</option>
          {subjects.map((sb) => (
            <option key={sb} value={sb}>{sb}</option>
          ))}
        </select>

        {/* Assignment */}
        <select
          className="border p-3 rounded-lg"
          value={filter.assignment}
          onChange={(e) => setFilter({ ...filter, assignment: e.target.value })}
        >
          <option value="">Select Assignment</option>
          {assignments.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex justify-center gap-6 mb-6">
        <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold">
          Show All Students
        </button>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
          Show Submitted Only
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded-xl shadow bg-white">
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr className="bg-teal-800 text-white">
              <th className="py-3">Select</th>
              <th>Admission No</th>
              <th>Student</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Section</th>
              <th>Submitted File</th>
              <th>Description</th>
              <th>Roll</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-600">
                  No Data Available
                </td>
              </tr>
            ) : (
              students.map((s, i) => (
                <tr key={i} className="border-b text-center">
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{s.admission}</td>
                  <td>{s.name}</td>
                  <td>{s.subject}</td>
                  <td>{s.class}</td>
                  <td>{s.section}</td>
                  <td>
                    <a href={s.file} className="text-blue-600 underline">
                      View File
                    </a>
                  </td>
                  <td>{s.description}</td>
                  <td>{s.roll}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-6">
        <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg">
          Save
        </button>

        <button className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg">
          Reset
        </button>
      </div>
    </div>
  );
}