export default function Batches() {

  const batches = [
    {
      batch: "Batch A",
      strength: 42,
      classTeacher: "Prof. Sneha Patil",
      timing: "9:00 AM - 12:00 PM",
      lab: "Computer Lab 1",
      subjects: ["DSA", "OOP", "DBMS", "Web Development"]
    },
    {
      batch: "Batch B",
      strength: 38,
      classTeacher: "Prof. Rohan Kulkarni",
      timing: "12:30 PM - 3:30 PM",
      lab: "Computer Lab 2",
      subjects: ["DSA", "Operating Systems", "Computer Network"]
    },
    {
      batch: "Batch C",
      strength: 40,
      classTeacher: "Prof. Manasi Desai",
      timing: "3:30 PM - 6:00 PM",
      lab: "Computer Lab 3",
      subjects: ["DBMS", "Software Engineering", "AI Basics"]
    }
  ];

  return (
    <div className="p-6 text-gray-900 dark:text-white">

      <h1 className="text-3xl font-bold mb-6">Batches Overview</h1>

      {/* BATCH CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {batches.map((b, i) => (
          <div
            key={i}
            className="
              bg-white dark:bg-[#1a1a1a] 
              border border-gray-300 dark:border-gray-700
              shadow-xl rounded-xl p-6 hover:shadow-2xl transition
            "
          >
            <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">
              {b.batch}
            </h2>

            <p><strong>Strength:</strong> {b.strength}</p>
            <p><strong>Class Teacher:</strong> {b.classTeacher}</p>
            <p><strong>Timing:</strong> {b.timing}</p>
            <p><strong>Lab:</strong> {b.lab}</p>

            <p className="mt-3 font-semibold">Subjects:</p>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
              {b.subjects.map((sub, idx) => (
                <li key={idx}>{sub}</li>
              ))}
            </ul>

          </div>
        ))}

      </div>
    </div>
  );
}
