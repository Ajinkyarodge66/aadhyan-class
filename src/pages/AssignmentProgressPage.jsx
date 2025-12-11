import { useState } from "react";

export default function AssignmentProgressPage() {
  const [tab, setTab] = useState("submitted");

  // -------- SAMPLE DATA FOR SUBMITTED --------
  const submittedData = [
    { student: "Roshni Patil", assignment: "Maths Worksheet", date: "12 Jan" },
    { student: "Anil Shinde", assignment: "Science Chapter 1", date: "12 Jan" },
    { student: "Meena Pawar", assignment: "History Notes", date: "11 Jan" },
  ];

  // -------- EXACT SCREENSHOT STYLE DATA FOR PENDING --------
  const pendingData = [
    { admission: "Imp0017", name: "Mohammad", subject: "Eng", className: "Nur", section: "A1" },
    { admission: "Imp0018", name: "Mohammad", subject: "Eng", className: "Nur", section: "A1" },
    { admission: "Imp0019", name: "KUNWAR RASHTRA DEEP", subject: "Eng", className: "Nur", section: "A1" },
    { admission: "ADM/2024/1789", name: "KRISHNA", subject: "Eng", className: "Nur", section: "A1" },
    { admission: "ADM/2024/1790", name: "ATHIYA", subject: "Eng", className: "Nur", section: "A1" },
    { admission: "ADM/2024/1792", name: "KUNAL", subject: "Eng", className: "Nur", section: "A1" },
    { admission: "ADM/2025/2023", name: "PARI", subject: "Eng", className: "Nur", section: "A1" },
  ];

  // ------------ PROGRESS DATA ------------
  const total = submittedData.length + pendingData.length;
  const percent = Math.round((submittedData.length / total) * 100);

  return (
    <div className="p-6">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-6">Assignment Progress</h1>

      {/* TABS */}
      <div className="flex gap-4 mb-6">
        <TabButton label="Submitted" id="submitted" tab={tab} setTab={setTab} />
        <TabButton label="Pending" id="pending" tab={tab} setTab={setTab} />
        <TabButton label="Progress" id="progress" tab={tab} setTab={setTab} />
      </div>

      {/* WHITE CONTENT BOX */}
      <div className="bg-white p-6 rounded-xl shadow-lg">

        {/* ============= SUBMITTED TAB ============= */}
        {tab === "submitted" && (
          <div>
            <h3 className="text-xl font-semibold mb-3">Submitted Assignments</h3>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 border">Student Name</th>
                  <th className="p-3 border">Assignment</th>
                  <th className="p-3 border">Date</th>
                </tr>
              </thead>

              <tbody>
                {submittedData.map((item, i) => (
                  <tr key={i} className="border">
                    <td className="p-3 border">{item.student}</td>
                    <td className="p-3 border">{item.assignment}</td>
                    <td className="p-3 border">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ============= PENDING TAB (Screenshot Style) ============= */}
        {tab === "pending" && (
          <div>
            <h3 className="text-3xl font-bold mb-6">Pending Assignments</h3>

            <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-300">
              <table className="w-full border-collapse text-lg">

                {/* BLUE HEADER */}
                <thead>
                  <tr className="bg-[#007bff] text-white text-left">
                    <th className="p-4 border border-gray-300">Admission No</th>
                    <th className="p-4 border border-gray-300">Student Name</th>
                    <th className="p-4 border border-gray-300">Subject Name</th>
                    <th className="p-4 border border-gray-300">Class Name</th>
                    <th className="p-4 border border-gray-300">Section Name</th>
                  </tr>
                </thead>

                {/* ALTERNATE ROWS */}
                <tbody>
                  {pendingData.map((item, i) => (
                    <tr
                      key={i}
                      className={`${i % 2 === 0 ? "bg-white" : "bg-[#eaf4ff]"} text-black`}
                    >
                      <td className="p-4 border border-gray-300">{item.admission}</td>
                      <td className="p-4 border border-gray-300">{item.name}</td>
                      <td className="p-4 border border-gray-300">{item.subject}</td>
                      <td className="p-4 border border-gray-300">{item.className}</td>
                      <td className="p-4 border border-gray-300">{item.section}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        )}

        {/* ============= PROGRESS TAB ============= */}
        {tab === "progress" && (
          <div>
            <h3 className="text-xl font-semibold mb-3">Overall Progress</h3>

            <div className="w-full bg-gray-300 h-4 rounded-full">
              <div
                className="bg-green-600 h-full rounded-full"
                style={{ width: `${percent}%` }}
              ></div>
            </div>

            <p className="mt-2 font-medium text-gray-700">{percent}% Completed</p>

            <div className="mt-4 flex gap-6">
              <div className="bg-green-100 p-4 rounded-lg shadow">
                <p className="text-green-700 font-semibold text-xl">{submittedData.length}</p>
                <p className="text-gray-600 text-sm">Submitted</p>
              </div>

              <div className="bg-red-100 p-4 rounded-lg shadow">
                <p className="text-red-700 font-semibold text-xl">{pendingData.length}</p>
                <p className="text-gray-600 text-sm">Pending</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ===== TAB BUTTON COMPONENT =====
function TabButton({ label, id, tab, setTab }) {
  return (
    <button
      onClick={() => setTab(id)}
      className={`px-4 py-2 rounded-lg font-medium ${
        tab === id ? "bg-blue-600 text-white" : "bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}
