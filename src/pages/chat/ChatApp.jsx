import PageWrapper from "../../components/PageWrapper.jsx";
import { useState } from "react";

export default function ChatApp() {
  // CHAT LIST
  const chatUsers = [
    { id: 1, name: "Muhammad" },
    { id: 2, name: "Akshay" },
  ];

  // MESSAGES FOR EACH STUDENT
  const [chatData, setChatData] = useState({
    1: [
      { from: "Student", text: "Nice", time: "2:59 AM" },
      { from: "Student", text: "Hello", time: "10:31 PM" },
    ],
    2: [
      { from: "Student", text: "Sir, good morning", time: "8:01 AM" },
    ],
  });

  const [activeUser, setActiveUser] = useState(1);
  const [message, setMessage] = useState("");

  const messages = chatData[activeUser] || [];

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      from: "You",
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    setChatData({
      ...chatData,
      [activeUser]: [...messages, newMessage],
    });

    setMessage("");
  };

  const deleteMessage = (index) => {
    const updated = messages.filter((_, i) => i !== index);
    setChatData({ ...chatData, [activeUser]: updated });
  };

  const refreshChats = () => {
    alert("Chats refreshed (demo only)");
  };

  return (
    < >
      <div className="bg-white rounded-2xl shadow-xl border flex h-[480px]">

        {/* LEFT: MESSAGE AREA */}
        <div className="w-2/3 border-r flex flex-col bg-gray-100">

          {/* CHAT HEADER */}
          <div className="p-3 bg-[#0f1b2a] text-white flex justify-between items-center">
            <h2 className="font-semibold">
              Chat with {chatUsers.find((u) => u.id === activeUser)?.name}
            </h2>
            <button onClick={refreshChats} className="text-sm bg-white text-black px-3 py-1 rounded">
              Refresh
            </button>
          </div>

          {/* CHAT BODY */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">

            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 ${
                  m.from === "You" ? "justify-end" : "justify-start"
                }`}
              >
                {/* DELETE ICON - only your messages */}
                {m.from === "You" && (
                  <button
                    className="text-red-600 text-xs"
                    onClick={() => deleteMessage(idx)}
                  >
                    🗑
                  </button>
                )}

                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm shadow ${
                    m.from === "You"
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <div className="text-[10px] opacity-70 font-semibold mb-1">
                    {m.from} • {m.time}
                  </div>
                  {m.text}
                </div>
              </div>
            ))}

          </div>

          {/* MESSAGE INPUT */}
          <div className="border-t p-3 flex gap-2 bg-white">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Send
            </button>
          </div>
        </div>

        {/* RIGHT: CHAT USER LIST */}
        <div className="w-1/3 p-4 bg-white">
          <h3 className="font-semibold text-sm mb-3">Initiated Chats</h3>

          <ul className="space-y-2 text-sm">
            {chatUsers.map((u) => (
              <li
                key={u.id}
                onClick={() => setActiveUser(u.id)}
                className={`border rounded-lg px-3 py-2 cursor-pointer ${
                  activeUser === u.id
                    ? "bg-blue-100 border-blue-600"
                    : "bg-gray-50"
                }`}
              >
                {u.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
