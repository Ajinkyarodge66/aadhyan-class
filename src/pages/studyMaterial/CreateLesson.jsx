import { useState } from "react";

export default function CreateLesson() {
  const [list, setList] = useState([
    { id: 1, course: "Diploma", branch: "CSE", name: "Colours", content: "Basic colours" },
    { id: 2, course: "BTech / BE", branch: "ME", name: "Vyakaran", content: "Varnan shabdo ka" },
  ]);

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [openInfo, setOpenInfo] = useState(false); // ⭐ i-button help modal

  const [active, setActive] = useState({
    id: null,
    course: "",
    branch: "",
    name: "",
    content: "",
  });

  const courses = ["Diploma", "BTech / BE", "MTech"];
  const branches = ["CSE", "ME", "CE"];

  const openAdd = () => {
    setActive({ id: null, course: "", branch: "", name: "", content: "" });
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setActive(row);
    setModalOpen(true);
  };

  const saveLesson = () => {
    if (!active.course || !active.branch || !active.name || !active.content) {
      alert("Please fill all fields!");
      return;
    }

    if (active.id === null) {
      setList([...list, { ...active, id: Date.now() }]);
    } else {
      setList(list.map((l) => (l.id === active.id ? active : l)));
    }
    setModalOpen(false);
  };

  const confirmDelete = () => {
    setList(list.filter((l) => l.id !== active.id));
    setDeleteModal(false);
  };

  const filtered = list.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.course.toLowerCase().includes(search.toLowerCase()) ||
    l.branch.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-black dark:text-white">

      {/* ⭐ TOP RIGHT INFO BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpenInfo(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full 
                     bg-gradient-to-br from-indigo-600 to-indigo-700 
                     text-white text-xl font-bold shadow-md 
                     hover:shadow-lg hover:scale-105 transition"
        >
          ℹ️
        </button>
      </div>

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <input
          placeholder="Search Lessons..."
          className="border px-4 py-2 rounded-lg w-1/3 
                     bg-white dark:bg-gray-800 
                     border-gray-300 dark:border-gray-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={openAdd}
          className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-lg font-semibold"
        >
          ADD LESSON
        </button>
      </div>

      {/* ===== PROPER TABLE ===== */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border dark:border-gray-700">
        <div className="overflow-x-auto max-h-[520px]">
          <table className="w-full min-w-[900px] text-sm border-collapse">

            <thead className="sticky top-0 z-10">
              <tr className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <th className="px-4 py-3 text-left">Lesson Name</th>
                <th className="px-4 py-3 text-left">Course</th>
                <th className="px-4 py-3 text-left">Branch</th>
                <th className="px-4 py-3 text-left">Content</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500 italic">
                    No matching lessons found.
                  </td>
                </tr>
              ) : (
                filtered.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`
                      ${index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-800"
                        : "bg-white dark:bg-gray-900"}
                      hover:bg-green-50 dark:hover:bg-gray-700
                      border-b dark:border-gray-700 transition
                    `}
                  >
                    <td className="px-4 py-3 font-medium">{row.name}</td>

                    <td className="px-4 py-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold
                                       bg-blue-100 text-blue-700
                                       dark:bg-blue-900 dark:text-blue-200">
                        {row.course}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold
                                       bg-purple-100 text-purple-700
                                       dark:bg-purple-900 dark:text-purple-200">
                        {row.branch}
                      </span>
                    </td>

                    <td className="px-4 py-3 max-w-[300px] truncate text-gray-700 dark:text-gray-300">
                      {row.content}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openEdit(row)}
                          className="px-3 py-1 rounded-md text-xs font-semibold
                                     bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          ✏ Edit
                        </button>

                        <button
                          onClick={() => {
                            setActive(row);
                            setDeleteModal(true);
                          }}
                          className="px-3 py-1 rounded-md text-xs font-semibold
                                     bg-red-600 hover:bg-red-700 text-white"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 animate-backdropFade">
          <div className="bg-white dark:bg-gray-900 w-[550px] p-6 rounded-xl shadow-xl animate-modalSlideUp">

            <h1 className="text-2xl font-bold text-center mb-4">
              {active.id ? "Edit Lesson" : "Add Lesson"}
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <select
                className="border px-3 py-2 rounded dark:bg-gray-800"
                value={active.course}
                onChange={(e) => setActive({ ...active, course: e.target.value })}
              >
                <option value="">Select Course</option>
                {courses.map((c) => <option key={c}>{c}</option>)}
              </select>

              <select
                className="border px-3 py-2 rounded dark:bg-gray-800"
                value={active.branch}
                onChange={(e) => setActive({ ...active, branch: e.target.value })}
              >
                <option value="">Select Branch</option>
                {branches.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>

            <input
              className="border w-full px-3 py-2 rounded mb-4 dark:bg-gray-800"
              placeholder="Enter Lesson Name"
              value={active.name}
              onChange={(e) => setActive({ ...active, name: e.target.value })}
            />

            <textarea
              className="border w-full px-3 py-2 rounded mb-4 dark:bg-gray-800"
              rows="4"
              placeholder="Enter Lesson Content"
              value={active.content}
              onChange={(e) => setActive({ ...active, content: e.target.value })}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                CANCEL
              </button>

              <button
                onClick={saveLesson}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                SAVE LESSON
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 animate-backdropFade">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-[350px] animate-modalSlideUp">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Delete this lesson?
            </h2>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⭐ HOW TO USE INFO MODAL */}
      {openInfo && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-backdropFade">

          <div className="bg-white dark:bg-[#140028] rounded-2xl shadow-2xl 
                          w-[90%] max-w-lg p-6 border dark:border-gray-700 animate-modalSlideUp">

            <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
              How to Use Lesson Creator
            </h1>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">

              <p>
                This panel helps you create, edit and delete lessons for different courses & branches.
              </p>

              <div>
                <h3 className="font-semibold">1️⃣ Add Lesson</h3>
                <p>Click <b>ADD LESSON</b> and fill Course, Branch, Name & Content.</p>
              </div>

              <div>
                <h3 className="font-semibold">2️⃣ Edit Lesson</h3>
                <p>Use ✏ Edit button to change details of an existing lesson.</p>
              </div>

              <div>
                <h3 className="font-semibold">3️⃣ Delete Lesson</h3>
                <p>Click 🗑 Delete to remove a lesson permanently.</p>
              </div>

              <div>
                <h3 className="font-semibold">4️⃣ Search Feature</h3>
                <p>Search lessons instantly by name, course, or branch.</p>
              </div>

              <div>
                <h3 className="font-semibold">📁 Lesson Data</h3>
                <p>All lesson information is stored locally but can be shifted to backend easily.</p>
              </div>

            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setOpenInfo(false)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 
                           text-white rounded-xl shadow-md"
              >
                Close
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
