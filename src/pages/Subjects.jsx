export default function Subjects() {
  // ⭐ Static subject info (later API जोडू शकतो)
  const subjectList = [
    {
      course: "Diploma",
      branch: "Computer Engineering",
      subjects: ["Programming in C", "Data Structures", "DBMS", "Digital Electronics"]
    },
    {
      course: "BTech / BE",
      branch: "Computer Science",
      subjects: ["OOP Java", "DSA", "Operating System", "Computer Networks", "Web Development"]
    },
    {
      course: "MTech",
      branch: "Software Engineering",
      subjects: ["AI & ML", "Deep Learning", "Cloud Computing", "Advanced Algorithms"]
    }
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">

      <h1 className="text-3xl font-bold mb-6">Subjects Information</h1>

      {/* SUBJECT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {subjectList.map((subj, index) => (
          <div
            key={index}
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow transition"
          >
            <h2 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-300">
              {subj.course}
            </h2>

            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Branch:</strong> {subj.branch}
            </p>

            <p className="font-semibold text-gray-700 dark:text-gray-300">Subjects:</p>

            <ul className="list-disc ml-6 mt-1 text-gray-800 dark:text-gray-200">
              {subj.subjects.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        ))}

      </div>
    </div>
  );
}

