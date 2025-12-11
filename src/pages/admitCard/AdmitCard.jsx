import { useState } from "react";
import PageWrapper from "../../components/PageWrapper.jsx";

export default function AdmitCard() {
  const [activeTab, setActiveTab] = useState("view");

  const [examType, setExamType] = useState("");
  const [subExam, setSubExam] = useState("");
  const [session, setSession] = useState("2025-2026");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");

  const [admitData, setAdmitData] = useState([]);

  // ===== Create Admit Section =====
  const [createdRows, setCreatedRows] = useState([]);

  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleGetDetails = () => {
    if (!examType || !subExam || !className || !section) {
      alert("Please select all fields!");
      return;
    }

    const sample = [
      {
        name: "Roshni Patil",
        roll: "12",
        admission: "A1102",
        father: "Anil Patil",
        mobile: "9876543210",
      },
    ];

    setAdmitData(sample);
  };

  // SAVE SUBJECT INSIDE CREATE TAB
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

    alert("Subject added!");
  };

  return (
    <>
      <div className="flex flex-col gap-6">

        {/* TABS */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("view")}
            className={`px-8 py-2 rounded-lg font-semibold shadow 
            ${activeTab === "view" ? "bg-blue-600 text-white" : "border border-blue-600 text-blue-600"}`}
          >
            ADMIT CARD
          </button>

          <button
            onClick={() => setActiveTab("create")}
            className={`px-8 py-2 rounded-lg font-semibold 
            ${activeTab === "create" ? "bg-blue-600 text-white" : "border border-blue-600 text-blue-600"}`}
          >
            CREATE NEW ADMIT
          </button>
        </div>

        {/* =========== VIEW TAB =========== */}
        {activeTab === "view" && (
          <>
            <div className="bg-white rounded-2xl shadow-xl border px-10 py-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <select className="border rounded-lg px-3 py-3" value={examType} onChange={(e) => setExamType(e.target.value)}>
                  <option value="">Exam Type</option>
                  <option>Unit Test</option>
                  <option>Half Yearly</option>
                  <option>Final Exam</option>
                </select>

                <select className="border rounded-lg px-3 py-3" value={subExam} onChange={(e) => setSubExam(e.target.value)}>
                  <option value="">Sub Exam</option>
                  <option>Part A</option>
                  <option>Part B</option>
                </select>

                <select className="border rounded-lg px-3 py-3" value={session} onChange={(e) => setSession(e.target.value)}>
                  <option>2025-2026</option>
                  <option>2024-2025</option>
                </select>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <select className="border rounded-lg px-3 py-3" value={className} onChange={(e) => setClassName(e.target.value)}>
                  <option value="">Class</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>

                <select className="border rounded-lg px-3 py-3" value={section} onChange={(e) => setSection(e.target.value)}>
                  <option value="">Section</option>
                  <option>A</option>
                  <option>B</option>
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

            {/* Admit Table */}
            <div className="bg-white rounded-2xl shadow-xl border overflow-x-auto mt-4">
              <table className="w-full border-collapse text-left">
                <thead className="bg-gray-100 border-b">
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
                      <td colSpan={5} className="text-center py-6 text-gray-600">
                        No admit details found.
                      </td>
                    </tr>
                  ) : (
                    admitData.map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
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

        {/* =========== CREATE TAB =========== */}
        {activeTab === "create" && (
          <div className="bg-white rounded-2xl shadow-xl border px-10 py-10">

            <h2 className="text-center font-semibold text-xl mb-8">Create New Admit Card</h2>

            {/* Header Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <select className="border rounded-lg px-3 py-3" value={examType} onChange={(e) => setExamType(e.target.value)}>
                <option value="">Select Exam Type</option>
                <option>Unit Test</option>
                <option>Half Yearly</option>
                <option>Final Exam</option>
              </select>

              <select className="border rounded-lg px-3 py-3" value={subExam} onChange={(e) => setSubExam(e.target.value)}>
                <option value="">Select Sub Exam</option>
                <option>Part A</option>
                <option>Part B</option>
              </select>

              <select className="border rounded-lg px-3 py-3" value={session} onChange={(e) => setSession(e.target.value)}>
                <option>2025-2026</option>
                <option>2024-2025</option>
              </select>
            </div>

            {/* Class / Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <select className="border rounded-lg px-3 py-3" value={className} onChange={(e) => setClassName(e.target.value)}>
                <option value="">Select Class</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>

              <select className="border rounded-lg px-3 py-3" value={section} onChange={(e) => setSection(e.target.value)}>
                <option value="">Select Section</option>
                <option>A</option>
                <option>B</option>
              </select>
            </div>

            {/* Subject Fields */}
            <h3 className="font-semibold text-lg mt-10 mb-3">Add Subject Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <input className="border px-3 py-3 rounded-lg" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
              <input type="date" className="border px-3 py-3 rounded-lg" value={date} onChange={(e) => setDate(e.target.value)} />
              <input type="time" className="border px-3 py-3 rounded-lg" value={start} onChange={(e) => setStart(e.target.value)} />
              <input type="time" className="border px-3 py-3 rounded-lg" value={end} onChange={(e) => setEnd(e.target.value)} />
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleAddSubject}
                className="bg-green-700 text-white px-10 py-3 rounded-lg font-semibold hover:bg-green-800"
              >
                ADD SUBJECT
              </button>
            </div>

            {/* CREATED TABLE */}
            <div className="bg-white rounded-2xl shadow-xl border overflow-x-auto mt-10">
              <table className="w-full border-collapse text-left">
                <thead className="bg-gray-100 border-b">
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
                      <td colSpan={4} className="text-center py-6 text-gray-600">
                        No subject added yet.
                      </td>
                    </tr>
                  ) : (
                    createdRows.map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
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
    </>
  );
}
