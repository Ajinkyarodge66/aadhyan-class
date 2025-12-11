import { useState, useEffect, useMemo } from "react";
import axios from "axios";

export default function LessonList() {
  const [lessons, setLessons] = useState([]);
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [loading, setLoading] = useState(true);

  const [formMode, setFormMode] = useState(""); // "view" | "edit" | "add"
  const [activeLesson, setActiveLesson] = useState(null);

  const API = "http://localhost:5000/api/lessons"; // 🔥 CHANGE according to backend

  // -------------------------------------------------------------------
  // 🔥 FETCH Lessons from Backend
  // -------------------------------------------------------------------
  const loadLessons = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setLessons(res.data);
    } catch (err) {
      console.error("Failed to fetch lessons", err);
      alert("Error fetching lessons!");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadLessons();
  }, []);

  // 🔥 UNIQUE class names from backend
  const classOptions = useMemo(() => {
    const set = new Set(lessons.map((l) => l.class));
    return Array.from(set);
  }, [lessons]);

  // 🔥 SEARCH + FILTER LOGIC
  const filtered = lessons.filter((l) => {
    const matchClass = filterClass === "" || l.class === filterClass;
    const s = search.toLowerCase();
    const matchText =
      l.name.toLowerCase().includes(s) || l.content.toLowerCase().includes(s);
    return matchClass && matchText;
  });

  // -------------------------------------------------------------------
  // 🔥 CRUD FUNCTIONS
  // -------------------------------------------------------------------

  // ADD or UPDATE lesson
  const saveLesson = async () => {
    try {
      if (formMode === "add") {
        await axios.post(API, activeLesson);
      } else if (formMode === "edit") {
        await axios.put(`${API}/${activeLesson.id}`, activeLesson);
      }

      setFormMode("");
      loadLessons();
    } catch (err) {
      alert("Save failed!");
      console.log(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!confirm("Delete this lesson?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      loadLessons();
    } catch (err) {
      alert("Delete failed!");
    }
  };

  // -------------------------------------------------------------------

  if (loading)
    return (
      <div className="text-center text-lg font-semibold py-10">
        Loading Lessons...
      </div>
    );

  return (
    <div>
      {/* Search + Add Button */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search Lessons..."
          className="border rounded-lg px-4 py-2 w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => {
            setActiveLesson({ name: "", class: "", content: "" });
            setFormMode("add");
          }}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold"
        >
          ADD LESSON
        </button>
      </div>

      {/* Class Filter */}
      <div className="mb-4 flex items-center gap-3">
        <select
          className="border rounded-lg px-4 py-2 w-52"
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
        >
          <option value="">All Classes</option>
          {classOptions.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        {filterClass && (
          <button
            onClick={() => setFilterClass("")}
            className="text-sm underline text-blue-600"
          >
            Clear Filter ({filterClass})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-teal-700 text-white text-left">
              <th className="p-3">Lesson Name</th>
              <th className="p-3">Class</th>
              <th className="p-3">Content</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No lessons found.
                </td>
              </tr>
            ) : (
              filtered.map((l) => (
                <tr key={l.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{l.name}</td>

                  <td
                    className="p-3 text-blue-700 underline cursor-pointer"
                    onClick={() => setFilterClass(l.class)}
                  >
                    {l.class}
                  </td>

                  <td className="p-3">{l.content}</td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => {
                        setActiveLesson(l);
                        setFormMode("view");
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      VIEW
                    </button>

                    <button
                      onClick={() => {
                        setActiveLesson(l);
                        setFormMode("edit");
                      }}
                      className="bg-orange-500 text-white px-3 py-1 rounded"
                    >
                      EDIT
                    </button>

                    <button
                      onClick={() => handleDelete(l.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW / EDIT / ADD Modal */}
      {formMode !== "" && activeLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4 capitalize">
              {formMode} Lesson
            </h2>

            <label className="font-medium">Lesson Name</label>
            <input
              disabled={formMode === "view"}
              className="border w-full px-3 py-2 rounded mb-3"
              value={activeLesson.name}
              onChange={(e) =>
                setActiveLesson({ ...activeLesson, name: e.target.value })
              }
            />

            <label className="font-medium">Class</label>
            <input
              disabled={formMode === "view"}
              className="border w-full px-3 py-2 rounded mb-3"
              value={activeLesson.class}
              onChange={(e) =>
                setActiveLesson({ ...activeLesson, class: e.target.value })
              }
            />

            <label className="font-medium">Content</label>
            <textarea
              disabled={formMode === "view"}
              className="border w-full px-3 py-2 rounded mb-3"
              value={activeLesson.content}
              onChange={(e) =>
                setActiveLesson({ ...activeLesson, content: e.target.value })
              }
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setFormMode("")}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Close
              </button>

              {formMode !== "view" && (
                <button
                  onClick={saveLesson}
                  className="px-4 py-2 bg-teal-600 text-white rounded"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

