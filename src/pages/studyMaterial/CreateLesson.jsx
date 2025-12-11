import PageWrapper from "../../components/PageWrapper.jsx";
import { useState } from "react";

export default function CreateLesson() {
  const [lesson, setLesson] = useState("");
  const [time, setTime] = useState("");
  const [list, setList] = useState([]);

  const addLesson = () => {
    if (!lesson || !time) return;
    setList([...list, { lesson, time }]);
    setLesson("");
    setTime("");
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl border px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
            placeholder="Lesson Name"
            className="border rounded-lg px-3 py-3"
          />
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Time (e.g. 09:00 AM)"
            className="border rounded-lg px-3 py-3"
          />
          <button
            onClick={addLesson}
            className="bg-blue-600 text-white rounded-lg font-semibold px-6 py-3"
          >
            Add
          </button>
        </div>

        <div className="mt-8">
          {list.length === 0 ? (
            <p className="text-gray-500">No lessons added yet.</p>
          ) : (
            <table className="w-full border-collapse text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-3">Lesson</th>
                  <th className="p-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {list.map((row, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-3">{row.lesson}</td>
                    <td className="p-3">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}