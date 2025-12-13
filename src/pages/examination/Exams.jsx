import { useState } from "react";

export default function Exams() {
  // ENGINEERING EXAM TYPES
  const examTypes = ["Unit Test", "Mid Term", "Final Exam", "Practical Exam"];
  const subExams = ["Part A", "Part B", "Oral Test", "Viva", "Practical"];
  const teachers = [
    "Dr. Ajay Patil (CSE)",
    "Prof. Rohan Kulkarni (Mechanical)",
    "Prof. Geeta Shah (Electrical)",
    "Prof. Sunita Pawar (Civil)",
    "Prof. Neha Shah (ENTC)"
  ];

  // COURSE OPTIONS
  const courses = ["Diploma", "BTech / BE", "MTech"];

  // DYNAMIC BRANCH OPTIONS BASED ON COURSE
  const branchOptions = {
    Diploma: [
      "Computer Engineering",
      "Mechanical Engineering",
      "Electrical Engineering",
      "Civil Engineering"
    ],
    "BTech / BE": [
      "Computer Science & Engineering (CSE)",
      "Mechanical Engineering",
      "Civil Engineering",
      "Electrical Engineering",
      "Electronics & Telecommunication (ENTC)",
      "Information Technology (IT)"
    ],
    MTech: [
      "Advanced Computer Science",
      "Structural Engineering",
      "VLSI & Embedded Systems",
      "Thermal Engineering"
    ]
  };

  // Batches
  const batches = ["Batch A", "Batch B", "Batch C"];

  // STATE MANAGEMENT
  const [filters, setFilters] = useState({
    examType: "",
    subExam: "",
    teacher: "",
    course: "",
    batch: "",
    branch: ""
  });

  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // ENGINEERING STUDENTS DATA (LARGE DATASET)
  const dummyStudents = [
    { id: 1, roll: 101, name: "Rohan Patil", admissionNo: "CE101" },
    { id: 2, roll: 102, name: "Sneha Desai", admissionNo: "CE102" },
    { id: 3, roll: 103, name: "Aisha Khan", admissionNo: "CE103" },
    { id: 4, roll: 104, name: "Vishal Shinde", admissionNo: "ME201" },
    { id: 5, roll: 105, name: "Aniket Jadhav", admissionNo: "ME202" },
    { id: 6, roll: 106, name: "Prachi Kulkarni", admissionNo: "CSE301" },
    { id: 7, roll: 107, name: "Rutuja Sawant", admissionNo: "CSE302" },
    { id: 8, roll: 108, name: "Akash More", admissionNo: "EE401" },
    { id: 9, roll: 109, name: "Meera Joshi", admissionNo: "EE402" },
    { id: 10, roll: 110, name: "Sahil Kadam", admissionNo: "CE501" },
    { id: 11, roll: 111, name: "Nikita Pawar", admissionNo: "CE502" },
    { id: 12, roll: 112, name: "Aman Singh", admissionNo: "ENTC601" },
    { id: 13, roll: 113, name: "Komal Sutar", admissionNo: "ENTC602" },
    { id: 14, roll: 114, name: "Soham Parab", admissionNo: "IT701" },
    { id: 15, roll: 115, name: "Tanvi Mule", admissionNo: "IT702" },
    { id: 16, roll: 116, name: "Yash Khot", admissionNo: "ME203" },
    { id: 17, roll: 117, name: "Hrishikesh Mane", admissionNo: "CSE303" },
    { id: 18, roll: 118, name: "Rajveer Patil", admissionNo: "CSE304" },
    { id: 19, roll: 119, name: "Saniya Mulla", admissionNo: "EE403" },
    { id: 20, roll: 120, name: "Anushka Pawar", admissionNo: "CE503" }
  ];

  // HANDLE FIELD UPDATE
  const updateField = (field, value) => {
    setFilters({ ...filters, [field]: value });

    if (field === "course") {
      setFilters({ ...filters, course: value, branch: "" });
    }
  };

  // GET STUDENT LIST
  const getStudents = () => {
    const { examType, subExam, teacher, course, batch, branch } = filters;

    if (!examType || !subExam || !teacher || !course || !batch || !branch) {
      alert("Please select all fields");
      return;
    }

    setStudents(dummyStudents);
    setShowTable(true);
  };

  // RESET FORM
  const resetForm = () => {
    setFilters({
      examType: "",
      subExam: "",
      teacher: "",
      course: "",
      batch: "",
      branch: ""
    });
    setStudents([]);
    setShowTable(false);
  };

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">

      <h2 className="text-4xl font-bold text-center mb-10 text-teal-700 dark:text-teal-400">
        Examination Details
      </h2>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-xl max-w-6xl mx-auto border border-slate-300 dark:border-slate-700">

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Dropdown label="Exam Type" value={filters.examType} options={examTypes}
            onChange={(v) => updateField("examType", v)} />

          <Dropdown label="Sub Exam" value={filters.subExam} options={subExams}
            onChange={(v) => updateField("subExam", v)} />

          <Dropdown label="Teacher" value={filters.teacher} options={teachers}
            onChange={(v) => updateField("teacher", v)} />

          <Dropdown label="Course" value={filters.course} options={courses}
            onChange={(v) => updateField("course", v)} />

          {/* DYNAMIC BRANCH DROPDOWN */}
          <Dropdown
            label="Branch"
            value={filters.branch}
            options={filters.course ? branchOptions[filters.course] : []}
            onChange={(v) => updateField("branch", v)}
          />

          <Dropdown label="Batch" value={filters.batch} options={batches}
            onChange={(v) => updateField("batch", v)} />
        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={getStudents}
            className="bg-teal-700 hover:bg-teal-800 dark:bg-teal-500 dark:hover:bg-teal-400 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            GET STUDENTS
          </button>

          <button
            onClick={resetForm}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            RESET
          </button>
        </div>
      </div>

      {/* STUDENT TABLE */}
      {showTable && (
        <div className="mt-10 max-w-6xl mx-auto bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-lg p-6 rounded-xl">
          <h3 className="text-2xl font-bold mb-4 text-center">Student List</h3>

          <table className="w-full border-collapse text-center">
            <thead>
              <tr className="bg-teal-700 dark:bg-teal-600 text-white">
                <th className="p-3">Roll No</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Admission No</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-b border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
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
      <label className="font-semibold text-slate-800 dark:text-slate-200">{label}:</label>
      <select
        className="w-full mt-1 px-4 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {label}</option>
        {options?.map((op) => (
          <option key={op}>{op}</option>
        ))}
      </select>
    </div>
  );
}
