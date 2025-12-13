import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAnnouncement() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [batch, setBatch] = useState("");
  const [content, setContent] = useState("");
  const [createdFor, setCreatedFor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAnnouncement = {
      id: Date.now(),
      title,
      course,
      batch,
      content: `<p>${content}</p>`,
      createdOn: new Date().toLocaleDateString(),
      createdBy: "Teacher",
      createdFor,
    };

    navigate("/announcements", { state: { newAnnouncement } });
  };

  return (
    <div
      className="
        w-full max-w-xl mx-auto p-6 rounded-lg shadow 
        bg-white dark:bg-gray-800 
        text-gray-900 dark:text-white
      "
    >
      <h1 className="text-2xl font-bold mb-4">Create Announcement</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* TITLE */}
        <input
          className="
            border w-full px-4 py-2 rounded 
            bg-white dark:bg-gray-700 
            text-black dark:text-white 
            border-gray-300 dark:border-gray-600
          "
          placeholder="Announcement Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* COURSE SELECT */}
        <select
          className="
            border w-full px-4 py-2 rounded 
            bg-white dark:bg-gray-700 
            text-black dark:text-white 
            border-gray-300 dark:border-gray-600
          "
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        >
          <option value="">Select Course</option>
          <option>Diploma</option>
          <option>BTech / BE</option>
          <option>MTech</option>
        </select>

        {/* BATCH SELECT */}
        <select
          className="
            border w-full px-4 py-2 rounded 
            bg-white dark:bg-gray-700 
            text-black dark:text-white 
            border-gray-300 dark:border-gray-600
          "
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          required
        >
          <option value="">Select Batch</option>
          <option>Batch A</option>
          <option>Batch B</option>
          <option>Batch C</option>
        </select>

        {/* CONTENT */}
        <textarea
          className="
            border w-full px-4 py-2 rounded 
            bg-white dark:bg-gray-700 
            text-black dark:text-white 
            border-gray-300 dark:border-gray-600
          "
          placeholder="Write your announcement..."
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        {/* CREATED FOR */}
        <select
          className="
            border w-full px-4 py-2 rounded 
            bg-white dark:bg-gray-700 
            text-black dark:text-white 
            border-gray-300 dark:border-gray-600
          "
          value={createdFor}
          onChange={(e) => setCreatedFor(e.target.value)}
          required
        >
          <option value="">Announcement For</option>
          <option value="Student">Student</option>
          <option value="Parent">Parent</option>
          <option value="Teachers">Teachers</option>
        </select>

        {/* SUBMIT */}
        <button
          type="submit"
          className="
            w-full bg-teal-600 text-white py-2 rounded-lg font-semibold 
            hover:bg-teal-700
          "
        >
          Save Announcement
        </button>
      </form>
    </div>
  );
}
