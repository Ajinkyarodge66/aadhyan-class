import { useState } from "react";

const coursesList = ["Diploma", "BTech / BE", "MTech"];
const branchesList = ["CSE", "ME", "CE"];
const lessonsList = ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4"];

const initialTopics = [
  { id: 1, course: "BTech / BE", topicName: "Food and Nutrition", branch: "CSE", lessonName: "Lesson 1" },
  { id: 2, course: "BTech / BE", topicName: "Atoms & Molecules", branch: "CSE", lessonName: "Lesson 3" },
  { id: 3, course: "Diploma", topicName: "Colours", branch: "CE", lessonName: "Lesson 1" },
];

export default function Topic() {
  const [topics, setTopics] = useState(initialTopics);
  const [search, setSearch] = useState("");
  const [popup, setPopup] = useState("");

  const [deletePopup, setDeletePopup] = useState({ show: false, id: null });

  const [active, setActive] = useState({
    id: null,
    course: "",
    topicName: "",
    branch: "",
    lessonName: "",
  });

  const filtered = topics.filter((t) =>
    t.topicName.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setActive({ id: null, course: "", topicName: "", branch: "", lessonName: "" });
    setPopup("add");
  };

  const openEdit = (t) => {
    setActive(t);
    setPopup("edit");
  };

  const saveTopic = () => {
    if (!active.course || !active.topicName || !active.branch || !active.lessonName) {
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

  const confirmDelete = () => {
    setTopics(topics.filter((t) => t.id !== deletePopup.id));
    setDeletePopup({ show: false, id: null });
  };

  return (
    <div className="p-4 text-gray-900 dark:text-white">

      {/* SEARCH BAR */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Topics..."
          className="border px-4 py-2 rounded-lg w-1/3
                     bg-white dark:bg-gray-700 
                     text-black dark:text-white 
                     border-gray-300 dark:border-gray-600"
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
      <div className="overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-300 dark:border-gray-700">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-teal-700 dark:bg-teal-900 text-white text-left">
              <th className="p-3">Course</th>
              <th className="p-3">Topic</th>
              <th className="p-3">Branch</th>
              <th className="p-3">Lesson</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500 dark:text-gray-300">
                  No topics found.
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-gray-300 dark:border-gray-700 
                             hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="p-3">{t.course}</td>
                  <td className="p-3">{t.topicName}</td>
                  <td className="p-3">{t.branch}</td>
                  <td className="p-3">{t.lessonName}</td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => openEdit(t)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      ✏ EDIT
                    </button>

                    <button
                      onClick={() => setDeletePopup({ show: true, id: t.id })}
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

      {/* ADD / EDIT POPUP */}
      {popup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 w-96 p-6 rounded-lg shadow-xl
                          text-black dark:text-white">

            <h2 className="text-xl font-bold mb-4 capitalize">{popup} Topic</h2>

            {/* COURSE */}
            <label className="font-medium">Course</label>
            <select
              className="border w-full px-3 py-2 rounded mb-3
                         bg-white dark:bg-gray-700 
                         text-black dark:text-white 
                         border-gray-300 dark:border-gray-600"
              value={active.course}
              onChange={(e) => setActive({ ...active, course: e.target.value })}
            >
              <option value="">Select Course</option>
              {coursesList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* TOPIC */}
            <label className="font-medium">Topic Name</label>
            <input
              className="border w-full px-3 py-2 rounded mb-3
                         bg-white dark:bg-gray-700 
                         text-black dark:text-white 
                         border-gray-300 dark:border-gray-600"
              value={active.topicName}
              onChange={(e) => setActive({ ...active, topicName: e.target.value })}
            />

            {/* BRANCH */}
            <label className="font-medium">Branch</label>
            <select
              className="border w-full px-3 py-2 rounded mb-3
                         bg-white dark:bg-gray-700 
                         text-black dark:text-white 
                         border-gray-300 dark:border-gray-600"
              value={active.branch}
              onChange={(e) => setActive({ ...active, branch: e.target.value })}
            >
              <option value="">Select Branch</option>
              {branchesList.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {/* LESSON */}
            <label className="font-medium">Lesson</label>
            <select
              className="border w-full px-3 py-2 rounded mb-3
                         bg-white dark:bg-gray-700 
                         text-black dark:text-white 
                         border-gray-300 dark:border-gray-600"
              value={active.lessonName}
              onChange={(e) => setActive({ ...active, lessonName: e.target.value })}
            >
              <option value="">Select Lesson</option>
              {lessonsList.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>

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

      {/* DELETE POPUP */}
      {deletePopup.show && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 w-96 p-6 rounded-xl shadow-2xl text-center">

            <h2 className="text-xl font-bold text-red-600 mb-4">Delete Topic?</h2>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete this topic?
              <br />This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeletePopup({ show: false, id: null })}
                className="px-5 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
