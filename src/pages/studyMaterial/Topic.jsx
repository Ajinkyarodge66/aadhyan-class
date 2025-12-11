import { useState } from "react";

// AVAILABLE CLASSES
const classesList = ["Nur", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

// AVAILABLE SUBJECTS
const subjectsList = ["Hindi", "English", "Maths", "EVS", "Science", "Social Studies"];

// AVAILABLE LESSONS
const lessonsList = ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4"];

const initialTopics = [
  {
    id: 1,
    className: "8",
    topicName: "Food and Nutrition",
    subjectName: "Science",
    lessonName: "Lesson 1",
  },
  {
    id: 2,
    className: "9",
    topicName: "Atoms & Molecules",
    subjectName: "Science",
    lessonName: "Lesson 3",
  },
  {
    id: 3,
    className: "Nur",
    topicName: "Colours",
    subjectName: "EVS",
    lessonName: "Lesson 1",
  },
];

export default function Topic() {
  const [topics, setTopics] = useState(initialTopics);
  const [search, setSearch] = useState("");
  const [popup, setPopup] = useState(""); // add or edit

  const [active, setActive] = useState({
    id: null,
    className: "",
    topicName: "",
    subjectName: "",
    lessonName: "",
  });

  const filtered = topics.filter((t) =>
    t.topicName.toLowerCase().includes(search.toLowerCase())
  );

  // OPEN ADD POPUP
  const openAdd = () => {
    setActive({
      id: null,
      className: "",
      topicName: "",
      subjectName: "",
      lessonName: "",
    });
    setPopup("add");
  };

  // OPEN EDIT POPUP
  const openEdit = (t) => {
    setActive(t);
    setPopup("edit");
  };

  // DELETE TOPIC
  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      setTopics(topics.filter((t) => t.id !== id));
    }
  };

  // SAVE TOPIC (Add or Edit)
  const saveTopic = () => {
    if (!active.className || !active.topicName) {
      alert("Please fill all fields!");
      return;
    }

    if (popup === "add") {
      const newTopic = { ...active, id: Date.now() };
      setTopics([...topics, newTopic]);
    } else {
      setTopics(topics.map((t) => (t.id === active.id ? active : t)));
    }

    setPopup("");
  };

  return (
    <div className="p-4">

      {/* SEARCH + ADD BUTTON */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Topics..."
          className="border px-4 py-2 rounded-lg w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={openAdd}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold"
        >
          ADD TOPIC
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-teal-700 text-white text-left">
              <th className="p-3">Class Name</th>
              <th className="p-3">Topic Name</th>
              <th className="p-3">Subject Name</th>
              <th className="p-3">Lesson Name</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No topics found.
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{t.className}</td>
                  <td className="p-3">{t.topicName}</td>
                  <td className="p-3">{t.subjectName}</td>
                  <td className="p-3">{t.lessonName}</td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => openEdit(t)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      ✏ EDIT
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      🗑 DELETE
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* POPUP */}
      {popup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-xl">

            <h2 className="text-xl font-bold mb-4 capitalize">
              {popup} Topic
            </h2>

            {/* CLASS DROPDOWN */}
            <label className="font-medium">Class</label>
            <select
              className="border w-full px-3 py-2 rounded mb-3"
              value={active.className}
              onChange={(e) =>
                setActive({ ...active, className: e.target.value })
              }
            >
              <option value="">Select Class</option>
              {classesList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* TOPIC NAME */}
            <label className="font-medium">Topic Name</label>
            <input
              className="border w-full px-3 py-2 rounded mb-3"
              value={active.topicName}
              onChange={(e) =>
                setActive({ ...active, topicName: e.target.value })
              }
            />

            {/* SUBJECT DROPDOWN */}
            <label className="font-medium">Subject</label>
            <select
              className="border w-full px-3 py-2 rounded mb-3"
              value={active.subjectName}
              onChange={(e) =>
                setActive({ ...active, subjectName: e.target.value })
              }
            >
              <option value="">Select Subject</option>
              {subjectsList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* LESSON DROPDOWN */}
            <label className="font-medium">Lesson</label>
            <select
              className="border w-full px-3 py-2 rounded mb-3"
              value={active.lessonName}
              onChange={(e) =>
                setActive({ ...active, lessonName: e.target.value })
              }
            >
              <option value="">Select Lesson</option>
              {lessonsList.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setPopup("")}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Close
              </button>

              <button
                onClick={saveTopic}
                className="px-4 py-2 bg-teal-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

