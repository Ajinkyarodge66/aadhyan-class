import { useState } from "react";

export default function Exams() {
  const examTypes = ["Unit Test", "Mid Term", "Final Exam"];
  const subExams = ["Part A", "Part B", "Oral Test"];
  const teachers = ["Roshni Mam", "Nitin Sir", "Anil Sir"];
  const classes = ["Nur", "LKG", "8", "9", "10"];
  const sections = ["A", "B"];
  const subjects = ["English", "Maths", "Hindi", "Science"];

  const [filters, setFilters] = useState({
    examType: "",
    subExam: "",
    teacher: "",
    class: "",
    section: "",
    subject: "",
  });

  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const dummyStudents = [
    { id: 1, roll: 12, name: "Rohan Patil", admissionNo: "A101" },
    { id: 2, roll: 14, name: "Sneha Desai", admissionNo: "A105" },
    { id: 3, roll: 18, name: "Aisha Khan", admissionNo: "A110" },
  ];

  const updateField = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const getStudents = () => {
    const { examType, subExam, teacher, class: cls, section, subject } = filters;

    if (!examType || !subExam || !teacher || !cls || !section || !subject) {
      alert("Please select all fields");
      return;
    }

    // simulate backend data
    setStudents(dummyStudents);
    setShowTable(true);
  };

  const resetForm = () => {
    setFilters({
      examType: "",
      subExam: "",
      teacher: "",
      class: "",
      section: "",
      subject: "",
    });
    setShowTable(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-center mb-10 text-blue-700">
        Examination Details
      </h2>

      <div className="bg-gradient-to-r from-yellow-300 to-orange-300 p-8 rounded-xl shadow-xl max-w-5xl mx-auto">

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Exam Type */}
          <Dropdown
            label="Exam Type"
            value={filters.examType}
            options={examTypes}
            onChange={(v) => updateField("examType", v)}
          />

          {/* Sub Exam */}
          <Dropdown
            label="Sub Exam"
            value={filters.subExam}
            options={subExams}
            onChange={(v) => updateField("subExam", v)}
          />

          {/* Teacher */}
          <Dropdown
            label="Teacher"
            value={filters.teacher}
            options={teachers}
            onChange={(v) => updateField("teacher", v)}
          />

          {/* Class */}
          <Dropdown
            label="Class"
            value={filters.class}
            options={classes}
            onChange={(v) => updateField("class", v)}
          />

          {/* Section */}
          <Dropdown
            label="Section"
            value={filters.section}
            options={sections}
            onChange={(v) => updateField("section", v)}
          />

          {/* Subject */}
          <Dropdown
            label="Subject"
            value={filters.subject}
            options={subjects}
            onChange={(v) => updateField("subject", v)}
          />

        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={getStudents}
            className="bg-green-700 text-white px-8 py-3 rounded font-semibold"
          >
            GET STUDENT
          </button>

          <button
            onClick={resetForm}
            className="bg-red-700 text-white px-8 py-3 rounded font-semibold"
          >
            CANCEL
          </button>
        </div>
      </div>

      {/* TABLE */}
      {showTable && (
        <div className="mt-10 bg-white shadow-lg p-6 rounded-xl max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-center">Student List</h3>

          <table className="w-full border text-center">
            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="p-3">Roll No</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Admission No</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{s.roll}</td>
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.admissionNo}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

function Dropdown({ label, value, options, onChange }) {
  return (
    <div>
      <label className="font-semibold">{label}:</label>
      <select
        className="w-full border px-4 py-2 rounded mt-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {label}</option>
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}
