import { useState, useEffect } from "react";

export default function AssignmentView() {
  const [filter, setFilter] = useState({
    teacher: "",
    course: "",
    batch: "",
    branch: "",
    assignment: "",
  });

  const courses = ["Diploma", "BTech / BE", "MTech"];
  const batches = ["Batch 2024", "Batch 2025", "Morning Batch"];
  const branches = ["CSE", "ME", "CE"];
  const teachers = ["Roshni", "Amit", "Priya"];
  const assignments = ["HW 01", "Classwork 02", "Revision Test"];

  // OLD BIG DATA
  const defaultStudentsData = [
    { admission: "A001", name: "Rahul Patil", branch: "CSE", course: "BTech / BE", batch: "Batch 2024", teacher: "Roshni", assignment: "HW 01", file: "file1.pdf", description: "Assignment submitted on time", roll: 12 },
    { admission: "A002", name: "Sneha Kulkarni", branch: "CSE", course: "BTech / BE", batch: "Batch 2024", teacher: "Roshni", assignment: "HW 01", file: "#", description: "Late submission", roll: 15 },
    { admission: "D101", name: "Om Jadhav", branch: "CE", course: "Diploma", batch: "Morning Batch", teacher: "Amit", assignment: "Classwork 02", file: "file2.pdf", description: "Well structured work", roll: 7 },
    { admission: "D102", name: "Pooja Deshmukh", branch: "ME", course: "Diploma", batch: "Morning Batch", teacher: "Amit", assignment: "Classwork 02", file: "#", description: "Good practical understanding", roll: 9 },
    { admission: "M301", name: "Amit Sharma", branch: "ME", course: "MTech", batch: "Batch 2025", teacher: "Priya", assignment: "Revision Test", file: "file3.pdf", description: "Excellent analysis", roll: 3 }
  ];

  const [students, setStudents] = useState([]);

  // LOAD ALL DATA (default + saved)
  const loadAllData = () => {
    const saved = JSON.parse(localStorage.getItem("assignments")) || [];

    const converted = saved.map((a, i) => ({
      admission: "NEW-" + (i + 1),
      name: "Assignment Created",
      branch: a.branch,
      course: a.course,
      batch: a.batch,
      teacher: "N/A",
      assignment: "Custom Assignment",
      file: a.fileName || "-",
      description: a.details,
      roll: "-",
    }));

    return [...defaultStudentsData, ...converted];
  };

  // PAGE OPEN → show nothing
  useEffect(() => {
    setStudents([]); // blank by default
  }, []);

  // SHOW ALL STUDENTS
  const showAllStudents = () => {
    const fullData = loadAllData();
    setStudents(fullData);
  };

  // SHOW SUBMITTED ONLY
  const showSubmittedOnly = () => {
    const fullData = loadAllData();
    const submitted = fullData.filter(
      (s) => s.file && s.file !== "#" && s.file !== "-"
    );
    setStudents(submitted);
  };

  // SAVE
  const handleSave = () => {
    localStorage.setItem("assignment_view_data", JSON.stringify(students));
    alert("Saved successfully!");
  };

  // RESET
  const handleReset = () => {
    setFilter({
      teacher: "",
      course: "",
      batch: "",
      branch: "",
      assignment: "",
    });
    setStudents([]); // clear table
  };

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">

      <h2 className="text-3xl font-semibold text-center mb-8">
        View Assignments
      </h2>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

        <select className="border p-3 rounded-lg bg-white dark:bg-gray-700"
          value={filter.teacher}
          onChange={(e) => setFilter({ ...filter, teacher: e.target.value })}>
          <option value="">Select Teacher</option>
          {teachers.map((t) => <option key={t}>{t}</option>)}
        </select>

        <select className="border p-3 rounded-lg bg-white dark:bg-gray-700"
          value={filter.course}
          onChange={(e) => setFilter({ ...filter, course: e.target.value })}>
          <option value="">Select Course</option>
          {courses.map((c) => <option key={c}>{c}</option>)}
        </select>

        <select className="border p-3 rounded-lg bg-white dark:bg-gray-700"
          value={filter.batch}
          onChange={(e) => setFilter({ ...filter, batch: e.target.value })}>
          <option value="">Select Batch</option>
          {batches.map((b) => <option key={b}>{b}</option>)}
        </select>

        <select className="border p-3 rounded-lg bg-white dark:bg-gray-700"
          value={filter.branch}
          onChange={(e) => setFilter({ ...filter, branch: e.target.value })}>
          <option value="">Select Branch</option>
          {branches.map((b) => <option key={b}>{b}</option>)}
        </select>

        <select className="border p-3 rounded-lg bg-white dark:bg-gray-700"
          value={filter.assignment}
          onChange={(e) => setFilter({ ...filter, assignment: e.target.value })}>
          <option value="">Select Assignment</option>
          {assignments.map((a) => <option key={a}>{a}</option>)}
        </select>

      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-center gap-6 mb-6">
        <button onClick={showAllStudents}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold">
          Show All Students
        </button>

        <button onClick={showSubmittedOnly}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
          Show Submitted Only
        </button>
      </div>

      {/* TABLE */}
      <div className="w-full overflow-x-auto border rounded-xl shadow bg-white dark:bg-gray-800">
        <table className="min-w-max w-full">
          <thead>
            <tr className="bg-teal-800 text-white">
              <th className="py-3">Admission</th>
              <th>Student</th>
              <th>Branch</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Teacher</th>
              <th>Assignment</th>
              <th>File</th>
              <th>Description</th>
              <th>Roll</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr><td colSpan={10} className="text-center py-6 text-gray-500">No Data Available</td></tr>
            ) : (
              students.map((s, i) => (
                <tr key={i} className="border-b text-center dark:border-gray-700">
                  <td>{s.admission}</td>
                  <td>{s.name}</td>
                  <td>{s.branch}</td>
                  <td>{s.course}</td>
                  <td>{s.batch}</td>
                  <td>{s.teacher}</td>
                  <td>{s.assignment}</td>
                  <td>{s.file}</td>
                  <td>{s.description}</td>
                  <td>{s.roll}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* SAVE + RESET */}
        <div className="flex justify-center gap-6 py-6">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-10 py-3 rounded-lg text-lg font-semibold"
          >
            Save
          </button>

          <button
            onClick={handleReset}
            className="bg-red-600 text-white px-10 py-3 rounded-lg text-lg font-semibold"
          >
            Reset
          </button>
        </div>
      </div>

    </div>
  );
}
