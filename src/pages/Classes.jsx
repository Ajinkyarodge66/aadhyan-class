export default function Classes() {
  const classInfo = [
    {
      course: "Diploma in Computer Engineering",
      strength: 45,
      batches: ["A", "B"],
      subjects: [
        "C Programming",
        "C++",
        "Data Structures",
        "Python",
        "DBMS",
        "Operating System",
        "Computer Networks",
      ],
      teacher: "Mrs. Kavita Deshmukh",
    },
    {
      course: "BTech / BE in Computer Engineering",
      strength: 48,
      batches: ["A", "B"],
      subjects: [
        "OOP with Java",
        "DSA",
        "Web Development (HTML, CSS, JS)",
        "Database Management System",
        "Operating System",
        "Computer Networks",
        "Software Engineering",
      ],
      teacher: "Mr. Suresh Patil",
    },
    {
      course: "MTech in Computer Science",
      strength: 50,
      batches: ["A", "B"],
      subjects: [
        "Machine Learning",
        "Deep Learning",
        "Cloud Computing",
        "Advanced Algorithms",
        "Distributed Systems",
        "Data Mining",
        "AI & Neural Networks",
      ],
      teacher: "Mrs. Neha Kulkarni",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Courses Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classInfo.map((cls, index) => (
          <div
            key={index}
            className="
              bg-white dark:bg-gray-800 
              text-gray-900 dark:text-gray-200
              shadow-lg dark:shadow-gray-700 
              rounded-xl p-6 border dark:border-gray-700 
              hover:shadow-2xl dark:hover:shadow-gray-600 
              transition transform hover:scale-[1.02]
            "
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">
              {cls.course}
            </h2>

            <p>
              <span className="font-semibold">Total Students:</span>{" "}
              {cls.strength}
            </p>

            <p>
              <span className="font-semibold">Batches:</span>{" "}
              {cls.batches.join(", ")}
            </p>

            <p className="mt-2 font-semibold">Subjects:</p>

            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-400">
              {cls.subjects.map((sub, i) => (
                <li key={i}>{sub}</li>
              ))}
            </ul>

            <p className="mt-3">
              <span className="font-semibold">Course Teacher:</span>{" "}
              {cls.teacher}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
