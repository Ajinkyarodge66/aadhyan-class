import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAnnouncement() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [className, setClassName] = useState("");
  const [content, setContent] = useState("");
  const [createdFor, setCreatedFor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAnnouncement = {
      id: Date.now(),
      title,
      className,
      content: `<p>${content}</p>`,
      createdOn: new Date().toLocaleDateString(),
      createdBy: "Teacher",
      createdFor,
    };

    navigate("/announcements", { state: { newAnnouncement } });
  };

  return (
    <div className="w-full max-w-xl bg-white shadow p-6 rounded-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Announcement</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="border w-full px-4 py-2 rounded"
          placeholder="Announcement Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          className="border w-full px-4 py-2 rounded"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        >
          <option value="">Select Class</option>
          <option value="Nur">Nur</option>
          <option value="LKG">LKG</option>
          <option value="UKG">UKG</option>
          <option value="1 to 10">1 to 10</option>
          <option value="All Classes">All Classes</option>
        </select>

        <textarea
          className="border w-full px-4 py-2 rounded"
          placeholder="Write your announcement..."
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        <select
          className="border w-full px-4 py-2 rounded"
          value={createdFor}
          onChange={(e) => setCreatedFor(e.target.value)}
          required
        >
          <option value="">Announcement For</option>
          <option value="Student">Student</option>
          <option value="Parent">Parent</option>
          <option value="Teachers">Teachers</option>
        </select>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700"
        >
          Save Announcement
        </button>
      </form>
    </div>
  );
}
