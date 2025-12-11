import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export default function Announcements() {
  const navigate = useNavigate();
  const location = useLocation();

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Holiday Tomorrow 🎉",
      className: "Nur",
      content: "<p>School will remain closed tomorrow.</p>",
      createdOn: "22/09/2025",
      createdBy: "Admin",
      createdFor: "Student",
    }
  ]);

  const [activeAnnouncement, setActiveAnnouncement] = useState(null);

  // 👇 Add newly created announcement received from CreateAnnouncement.jsx
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

  return (
    <div className="w-full px-6 pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">View Announcements</h1>

        <button
          onClick={() => navigate("/create-announcement")}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow font-semibold hover:bg-teal-700"
        >
          Create Announcement
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-6">
        {announcements.map((a) => (
          <div
            key={a.id}
            onClick={() => handleView(a)}
            className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition relative"
          >
            <span className="absolute right-6 top-6 text-red-600 text-xl hover:text-red-800">
              <FaTrash
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(a.id);
                }}
              />
            </span>

            <span className="bg-blue-200 text-blue-700 px-4 py-1 rounded-lg font-semibold">
              {a.className}
            </span>

            <h2 className="text-xl font-bold mt-3">{a.title}</h2>

            <div
              className="text-gray-600 mt-2"
              dangerouslySetInnerHTML={{ __html: a.content }}
            />

            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p><strong>Created On:</strong> {a.createdOn}</p>
              <p><strong>Created By:</strong> {a.createdBy}</p>
              <p><strong>Created For:</strong> {a.createdFor}</p>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW POPUP */}
      {activeAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded-xl shadow-xl">

            <h2 className="text-2xl font-bold mb-3">{activeAnnouncement.title}</h2>

            <div
              className="text-gray-700 mb-4"
              dangerouslySetInnerHTML={{ __html: activeAnnouncement.content }}
            />

            <p><strong>Class:</strong> {activeAnnouncement.className}</p>
            <p><strong>Created On:</strong> {activeAnnouncement.createdOn}</p>
            <p><strong>Created By:</strong> {activeAnnouncement.createdBy}</p>
            <p><strong>Created For:</strong> {activeAnnouncement.createdFor}</p>

            <button
              onClick={closeModal}
              className="mt-5 w-full bg-teal-600 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
