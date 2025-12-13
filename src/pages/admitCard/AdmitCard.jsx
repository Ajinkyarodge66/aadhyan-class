import { useState } from "react";

export default function AdmitCard() {
  const [activeTab, setActiveTab] = useState("view");

  const [examType, setExamType] = useState("");
  const [subExam, setSubExam] = useState("");
  const [session, setSession] = useState("2025-2026");
  const [course, setCourse] = useState("");
  const [batch, setBatch] = useState("");
  const [admitData, setAdmitData] = useState([]);

  const [createdRows, setCreatedRows] = useState([]);

  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  // 🔥 Dummy Student DB (Filter will work)
  const allStudents = [
    {
      course: "Diploma",
      batch: "Batch A",
      name: "Roshni Patil",
      roll: "12",
      admission: "A1102",
      father: "Anil Patil",
      mobile: "9876543210",
    },
    {
      course: "Diploma",
      batch: "Batch B",
      name: "Ganesh More",
      roll: "8",
      admission: "B2210",
      father: "Suresh More",
      mobile: "9871112222",
    },
    {
      course: "BTech / BE",
      batch: "Batch A",
      name: "Vaishnavi Shinde",
      roll: "5",
      admission: "BT331",
      father: "Prakash Shinde",
      mobile: "9872233445",
    },
    {
      course: "MTech",
      batch: "Batch C",
      name: "Sagar Jadhav",
      roll: "3",
      admission: "MT998",
      father: "Mahesh Jadhav",
      mobile: "9765432109",
    },
  ];

  // ⭐ GET DETAILS CLICK → Filter Students
  const handleGetDetails = () => {
    if (!examType || !subExam || !course || !batch) {
      alert("Please select all fields!");
      return;
    }

    const result = allStudents.filter(
      (s) => s.course === course && s.batch === batch
    );

    if (result.length === 0) {
      alert("No students found for selected Course & Batch!");
    }

    setAdmitData(result);
  };

  const handleAddSubject = () => {
    if (!subject || !date || !start || !end) {
      alert("Please fill all subject details!");
      return;
    }

    const newRow = { subject, date, start, end };
    setCreatedRows([...createdRows, newRow]);

    setSubject("");
    setDate("");
    setStart("");
    setEnd("");
  };

  return (
    <div className="flex flex-col gap-6 dark:text-white">

      {/* Tabs */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("view")}
          className={`px-8 py-2 rounded-lg font-semibold shadow
            ${activeTab === "view"
              ? "bg-blue-600 text-white"
              : "border border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-300"
            }`}
        >
          ADMIT CARD
        </button>

        <button
          onClick={() => setActiveTab("create")}
          className={`px-8 py-2 rounded-lg font-semibold
            ${activeTab === "create"
              ? "bg-blue-600 text-white"
              : "border border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-300"
            }`}
        >
          CREATE NEW ADMIT
        </button>
      </div>

      {/* VIEW TAB */}
      {activeTab === "view" && (
        <>
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border dark:border-gray-700 px-10 py-10">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Exam Type */}
              <select
                className="border rounded-lg px-3 py-3 bg-white dark:bg-gray-800 
                           text-black dark:text-white border-gray-300 dark:border-gray-600"
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
              >
                <option value="">Exam Type</option>
                <option>Unit Test</option>
                <option>Half Yearly</option>
                <option>Final Exam</option>
              </select>

              {/* Sub Exam */}
              <select
                className="border rounded-lg px-3 py-3 bg-white dark:bg-gray-800 
                           text-black dark:text-white border-gray-300 dark:border-gray-600"
                value={subExam}
                onChange={(e) => setSubExam(e.target.value)}
              >
                <option value="">Sub Exam</option>
                <option>Part A</option>
                <option>Part B</option>
              </select>

              {/* Session */}
              <select
                className="border rounded-lg px-3 py-3 bg-white dark:bg-gray-800 
                           text-black dark:text-white border-gray-300 dark:border-gray-600"
                value={session}
                onChange={(e) => setSession(e.target.value)}
              >
                <option>2025-2026</option>
                <option>2024-2025</option>
              </select>
            </div>

            {/* COURSE & BATCH */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

              {/* Course */}
              <select
                className="border rounded-lg px-3 py-3 bg-white dark:bg-gray-800 
                           text-black dark:text-white border-gray-300 dark:border-gray-600"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="">Course</option>
                <option>Diploma</option>
                <option>BTech / BE</option>
                <option>MTech</option>
              </select>

              {/* Batch */}
              <select
                className="border rounded-lg px-3 py-3 bg-white dark:bg-gray-800 
                           text-black dark:text-white border-gray-300 dark:border-gray-600"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
              >
                <option value="">Batch</option>
                <option>Batch A</option>
                <option>Batch B</option>
                <option>Batch C</option>
              </select>

            </div>

            <div className="flex justify-center mt-10">
              <button
                onClick={handleGetDetails}
                className="bg-teal-700 text-white px-10 py-3 rounded-lg font-semibold hover:bg-teal-800"
              >
                GET ADMIT DETAILS
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border dark:border-gray-700 overflow-x-auto mt-4">
            <table className="w-full border-collapse text-left">
              <thead className="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
                <tr>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Roll No</th>
                  <th className="p-3">Admission No</th>
                  <th className="p-3">Father's Name</th>
                  <th className="p-3">Mobile No</th>
                </tr>
              </thead>

              <tbody>
                {admitData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-600 dark:text-gray-300">
                      No admit details found.
                    </td>
                  </tr>
                ) : (
                  admitData.map((item, idx) => (
                    <tr key={idx} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.roll}</td>
                      <td className="p-3">{item.admission}</td>
                      <td className="p-3">{item.father}</td>
                      <td className="p-3">{item.mobile}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* CREATE TAB */}
      {activeTab === "create" && (
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border dark:border-gray-700 px-10 py-10">

          <h2 className="text-center font-semibold text-xl mb-8">Create New Admit Card</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <select className="border rounded-lg px-3 py-3 bg-white dark:bg-gray-800 
                               text-black dark:text-white border-gray-300 dark:border-gray-600"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
            >
              <option value="">Select Exam Type</option>
              <option>Unit Test</option>
              <option>Half Yearly</option>
              <option>Final Exam</option>
            </select>

            <select className="border rounded-lg px-3 py-3 bg-white dark:bg-gray-800 
                               text-black dark:text-white border-gray-300 dark:border-gray-600"
              value={subExam}
              onChange={(e) => setSubExam(e.target.value)}
            >
              <option value="">Select Sub Exam</option>
              <option>Part A</option>
              <option>Part B</option>
            </select>

            <select className="border rounded-lg px-3 py-3 bg-white dark:bg-gray-800 
                               text-black dark:text-white border-gray-300 dark:border-gray-600"
              value={session}
              onChange={(e) => setSession(e.target.value)}
            >
              <option>2025-2026</option>
              <option>2024-2025</option>
            </select>

          </div>

          {/* COURSE & BATCH */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <select className="border rounded-lg px-3 py-3 bg-white dark:bg-gray-800 
                               text-black dark:text-white border-gray-300 dark:border-gray-600"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              <option>Diploma</option>
              <option>BTech / BE</option>
              <option>MTech</option>
            </select>

            <select className="border rounded-lg px-3 py-3 bg-white dark:bg-gray-800 
                               text-black dark:text-white border-gray-300 dark:border-gray-600"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
            >
              <option value="">Select Batch</option>
              <option>Batch A</option>
              <option>Batch B</option>
              <option>Batch C</option>
            </select>
          </div>

          {/* SUBJECT AREA */}
          <h3 className="font-semibold text-lg mt-10 mb-3">Add Subject Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <input
              className="border rounded-lg px-3 py-3 bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <input
              type="date"
              className="border rounded-lg px-3 py-3 bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type="time"
              className="border rounded-lg px-3 py-3 bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />

            <input
              type="time"
              className="border rounded-lg px-3 py-3 bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleAddSubject}
              className="bg-green-700 text-white px-10 py-3 rounded-lg font-semibold hover:bg-green-800"
            >
              ADD SUBJECT
            </button>
          </div>

          {/* SUBJECT TABLE */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border dark:border-gray-700 overflow-x-auto mt-10">
            <table className="w-full border-collapse text-left">
              <thead className="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
                <tr>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Start Time</th>
                  <th className="p-3">End Time</th>
                </tr>
              </thead>

              <tbody>
                {createdRows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-600 dark:text-gray-300">
                      No subject added yet.
                    </td>
                  </tr>
                ) : (
                  createdRows.map((item, idx) => (
                    <tr key={idx} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-3">{item.subject}</td>
                      <td className="p-3">{item.date}</td>
                      <td className="p-3">{item.start}</td>
                      <td className="p-3">{item.end}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
}

