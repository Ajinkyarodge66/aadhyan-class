import { useState } from "react";

export default function CreateAssignment() {
  const courses = ["Diploma", "BTech / BE", "MTech"];
  const batches = ["Batch 2024", "Batch 2025", "Morning Batch", "Evening Batch"];
  const branches = ["CSE", "ME", "CE"];

  const [form, setForm] = useState({
    course: "",
    batch: "",
    branch: "",
    files: null,
    creationDate: "",
    submissionDate: "",
    details: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 📌 Existing Assignments load करा
    const oldAssignments = JSON.parse(localStorage.getItem("assignments")) || [];

    // 📌 New Assignment तयार करा
    const newAssignment = {
      ...form,
      id: Date.now(),
      fileName: form.files?.[0]?.name || "No File",
      status: form.files ? "Submitted" : "Not Submitted"
    };

    // 📌 Save to LocalStorage
    localStorage.setItem(
      "assignments",
      JSON.stringify([...oldAssignments, newAssignment])
    );

    alert("Assignment Created Successfully!");
    resetForm();
  };

  const resetForm = () => {
    setForm({
      course: "",
      batch: "",
      branch: "",
      files: null,
      creationDate: "",
      submissionDate: "",
      details: "",
    });
  };

  return (
    <div className="p-6 rounded-xl shadow-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-center text-3xl font-bold mb-6">Create Assignment</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* COURSE - BATCH - BRANCH */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* COURSE */}
          <div>
            <label className="font-semibold">Course:</label>
            <select
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
              className="w-full mt-1 p-3 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* BATCH */}
          <div>
            <label className="font-semibold">Batch:</label>
            <select
              value={form.batch}
              onChange={(e) => setForm({ ...form, batch: e.target.value })}
              className="w-full mt-1 p-3 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            >
              <option value="">Select Batch</option>
              {batches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* BRANCH */}
          <div>
            <label className="font-semibold">Branch:</label>
            <select
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
              className="w-full mt-1 p-3 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            >
              <option value="">Select Branch</option>
              {branches.map((br) => (
                <option key={br} value={br}>{br}</option>
              ))}
            </select>
          </div>

        </div>

        {/* FILE UPLOAD */}
        <div>
          <label className="font-semibold">Upload Files:</label>
          <input
            type="file"
            multiple
            onChange={(e) => setForm({ ...form, files: e.target.files })}
            className="w-full mt-1 p-3 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* DATES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="font-semibold">Creation Date:</label>
            <input
              type="date"
              value={form.creationDate}
              onChange={(e) => setForm({ ...form, creationDate: e.target.value })}
              className="w-full mt-1 p-3 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="font-semibold">Submission Date:</label>
            <input
              type="date"
              value={form.submissionDate}
              onChange={(e) =>
                setForm({ ...form, submissionDate: e.target.value })
              }
              className="w-full mt-1 p-3 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

        </div>

        {/* DETAILS */}
        <div>
          <label className="font-semibold">Details:</label>
          <textarea
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            rows="4"
            placeholder="Write assignment instructions..."
            className="w-full mt-1 p-3 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-6 mt-4">
          <button type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold">
            CREATE ASSIGNMENT
          </button>

          <button type="button" onClick={resetForm}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold">
            RESET
          </button>
        </div>

      </form>
    </div>
  );
}
