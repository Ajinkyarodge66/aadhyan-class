import { useState } from "react";

export default function CreateAssignment() {
  const classes = ["Nur", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const sections = ["A", "B", "C"];
  const subjects = ["Hindi", "English", "Maths", "Science", "EVS"];

  const [form, setForm] = useState({
    className: "",
    section: "",
    subject: "",
    files: null,
    creationDate: "",
    submissionDate: "",
    details: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Assignment Data:", form);
    alert("Assignment Created Successfully!");
  };

  const resetForm = () => {
    setForm({
      className: "",
      section: "",
      subject: "",
      files: null,
      creationDate: "",
      submissionDate: "",
      details: "",
    });
  };

  return (
    <div className="p-6 bg-gradient-to-r from-orange-300 to-yellow-200 rounded-xl shadow-xl">

      <h2 className="text-center text-3xl font-bold mb-6">Create Assignment</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* CLASS - SECTION - SUBJECT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* CLASS */}
          <div>
            <label className="font-semibold">Class:</label>
            <select
              value={form.className}
              onChange={(e) => setForm({ ...form, className: e.target.value })}
              className="w-full mt-1 p-3 border rounded-lg bg-white"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* SECTION */}
          <div>
            <label className="font-semibold">Section:</label>
            <select
              value={form.section}
              onChange={(e) => setForm({ ...form, section: e.target.value })}
              className="w-full mt-1 p-3 border rounded-lg bg-white"
            >
              <option value="">Select Section</option>
              {sections.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          {/* SUBJECT */}
          <div>
            <label className="font-semibold">Subject:</label>
            <select
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full mt-1 p-3 border rounded-lg bg-white"
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* FILE UPLOAD */}
        <div>
          <label className="font-semibold">
            Upload Files (PDF, JPEG, PNG, JPG):
          </label>
          <input
            type="file"
            multiple
            onChange={(e) => setForm({ ...form, files: e.target.files })}
            className="w-full mt-1 p-3 border rounded-lg bg-white"
          />
        </div>

        {/* CREATION + SUBMISSION DATE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Creation Date */}
          <div>
            <label className="font-semibold">Creation Date:</label>
            <input
              type="date"
              value={form.creationDate}
              onChange={(e) =>
                setForm({ ...form, creationDate: e.target.value })
              }
              className="w-full mt-1 p-3 border rounded-lg bg-white"
            />
          </div>

          {/* Submission Date */}
          <div>
            <label className="font-semibold">Submission Date:</label>
            <input
              type="date"
              value={form.submissionDate}
              onChange={(e) =>
                setForm({ ...form, submissionDate: e.target.value })
              }
              className="w-full mt-1 p-3 border rounded-lg bg-white"
            />
          </div>

        </div>

        {/* DETAILS */}
        <div>
          <label className="font-semibold">Details:</label>
          <textarea
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            className="w-full mt-1 p-3 border rounded-lg bg-white"
            rows="4"
            placeholder="Write assignment instructions..."
          ></textarea>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-6 mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-green-700"
          >
            CREATE ASSIGNMENT
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-red-700"
          >
            RESET
          </button>
        </div>
      </form>
    </div>
  );
}
