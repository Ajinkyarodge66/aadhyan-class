import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export default function Announcements() {
  const navigate = useNavigate();
  const location = useLocation();

  // ⭐ Info Modal State
  const [openInfo, setOpenInfo] = useState(false);

  // ⭐ Updated Data Structure (course + batch added)
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Holiday Tomorrow 🎉",
      course: "Diploma",
      batch: "Batch A",
      content: "<p>School will remain closed tomorrow.</p>",
      createdOn: "22/09/2025",
      createdBy: "Admin",
      createdFor: "Student",
    }
  ]);

  const [activeAnnouncement, setActiveAnnouncement] = useState(null);

  // ⭐ Filters
  const [filterCourse, setFilterCourse] = useState("");
  const [filterBatch, setFilterBatch] = useState("");

  // ⭐ Add new announcement from CreateAnnouncement page
  useEffect(() => {
    if (location.state?.newAnnouncement) {
      setAnnouncements((prev) => [...prev, location.state.newAnnouncement]);
    }
  }, [location.state]);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  const handleView = (announcement) => setActiveAnnouncement(announcement);
  const closeModal = () => setActiveAnnouncement(null);

  // ⭐ FILTER LOGIC
  const filteredAnnouncements = announcements.filter((a) => {
    return (
      (!filterCourse || a.course === filterCourse) &&
      (!filterBatch || a.batch === filterBatch)
    );
  });

  return (
    <div className="w-full px-6 pb-10 
      text-gray-900 dark:text-white 
      bg-white dark:bg-gray-900 
      min-h-screen">

      {/* HEADER + I BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">View Announcements</h1>

        <div className="flex items-center gap-3">
          
          {/* ⭐ i-Button */}
          <button
            onClick={() => setOpenInfo(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full
                       bg-gradient-to-br from-blue-600 to-blue-700
                       text-white text-xl font-bold shadow hover:scale-110 transition"
          >
            ℹ️
          </button>

          <button
            onClick={() => navigate("/create-announcement")}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow font-semibold hover:bg-teal-700"
          >
            Create Announcement
          </button>
        </div>
      </div>

      {/* ⭐ FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <select
          className="px-3 py-3 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700"
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
        >
          <option value="">Filter by Course</option>
          <option>Diploma</option>
          <option>BTech / BE</option>
          <option>MTech</option>
        </select>

        <select
          className="px-3 py-3 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700"
          value={filterBatch}
          onChange={(e) => setFilterBatch(e.target.value)}
        >
          <option value="">Filter by Batch</option>
          <option>Batch A</option>
          <option>Batch B</option>
          <option>Batch C</option>
        </select>
      </div>

      {/* LIST */}
      <div className="space-y-6">
        {filteredAnnouncements.map((a) => (
          <div
            key={a.id}
            onClick={() => handleView(a)}
            className="
              p-6 rounded-xl shadow cursor-pointer transition relative
              bg-white dark:bg-gray-800 
              hover:shadow-lg dark:hover:shadow-gray-700
            "
          >
            {/* DELETE BUTTON */}
            <span className="absolute right-6 top-6 text-red-600 text-xl hover:text-red-800">
              <FaTrash
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(a.id);
                }}
              />
            </span>

            {/* COURSE BADGE */}
            <span className="
              px-4 py-1 rounded-lg font-semibold text-sm
              bg-blue-200 text-blue-700 
              dark:bg-blue-900 dark:text-blue-200
            ">
              {a.course} • {a.batch}
            </span>

            <h2 className="text-xl font-bold mt-3">{a.title}</h2>

            <div
              className="mt-2 text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: a.content }}
            />

            <div className="mt-4 text-sm space-y-1 text-gray-700 dark:text-gray-300">
              <p><strong>Created On:</strong> {a.createdOn}</p>
              <p><strong>Created By:</strong> {a.createdBy}</p>
              <p><strong>Created For:</strong> {a.createdFor}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ANNOUNCEMENT VIEW POPUP */}
      {activeAnnouncement && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-white 
            w-96 p-6 rounded-xl shadow-xl
          ">
            <h2 className="text-2xl font-bold mb-3">{activeAnnouncement.title}</h2>

            <div
              className="text-gray-700 dark:text-gray-300 mb-4"
              dangerouslySetInnerHTML={{ __html: activeAnnouncement.content }}
            />

            <p><strong>Course:</strong> {activeAnnouncement.course}</p>
            <p><strong>Batch:</strong> {activeAnnouncement.batch}</p>
            <p><strong>Created On:</strong> {activeAnnouncement.createdOn}</p>
            <p><strong>Created By:</strong> {activeAnnouncement.createdBy}</p>
            <p><strong>Created For:</strong> {activeAnnouncement.createdFor}</p>

            <button
              onClick={closeModal}
              className="mt-5 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ⭐ HELP MODAL */}
      {openInfo && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

          <div className="bg-white dark:bg-[#140028] text-black dark:text-white 
                          w-[90%] max-w-lg p-6 rounded-2xl shadow-xl 
                          animate-modalSlideUp border dark:border-gray-700">

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-4">
              How to Use Announcements Module
            </h2>

            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>📌 This module helps Admin/Teachers to publish important updates.</p>

              <p><b>1️⃣ Create Announcement:</b> Click “Create Announcement”.</p>
              <p><b>2️⃣ Add Title + Content:</b> Description, message, instructions.</p>
              <p><b>3️⃣ Select Course & Batch:</b> Students will be filtered.</p>
              <p><b>4️⃣ Students View:</b> Only their course-batch announcements.</p>
              <p><b>5️⃣ Delete Option:</b> Remove wrong updates anytime.</p>
            </div>

            <button
              onClick={() => setOpenInfo(false)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 
                        text-white py-2 rounded-lg shadow-md"
            >
              Close
            </button>
          </div>

        </div>
      )}

    </div>
  );
}


