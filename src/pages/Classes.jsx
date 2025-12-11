export default function Classes() {
  const classInfo = [
    {
      class: "8th Standard",
      strength: 45,
      sections: ["A", "B"],
      subjects: ["Maths", "Science", "English", "History", "Geography"],
      classTeacher: "Mrs. Kavita Deshmukh",
    },
    {
      class: "9th Standard",
      strength: 48,
      sections: ["A", "B"],
      subjects: ["Algebra", "Geometry", "Science", "English", "History"],
      classTeacher: "Mr. Suresh Patil",
    },
    {
      class: "10th Standard",
      strength: 50,
      sections: ["A", "B"],
      subjects: [
        "Algebra",
        "Geometry",
        "Science",
        "English",
        "History",
        "Geography",
      ],
      classTeacher: "Mrs. Neha Kulkarni",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Classes Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classInfo.map((cls, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-xl p-6 border hover:shadow-2xl transition"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-700">
              {cls.class}
            </h2>

            <p className="text-gray-700">
              <span className="font-semibold">Total Students:</span>{" "}
              {cls.strength}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Sections:</span>{" "}
              {cls.sections.join(", ")}
            </p>

            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Subjects:</span>
            </p>
            <ul className="list-disc ml-6 text-gray-600">
              {cls.subjects.map((sub, i) => (
                <li key={i}>{sub}</li>
              ))}
            </ul>

            <p className="mt-3 text-gray-700">
              <span className="font-semibold">Class Teacher:</span>{" "}
              {cls.classTeacher}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

