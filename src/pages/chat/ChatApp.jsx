import { useState } from "react";

export default function ChatApp() {
  const chatUsers = [
    { id: 1, name: "Muhammad" },
    { id: 2, name: "Akshay" },
  ];

  const [chatData, setChatData] = useState({
    1: [
      { from: "Student", text: "Nice", time: "2:59 AM" },
      { from: "Student", text: "Hello", time: "10:31 PM" },
    ],
    2: [{ from: "Student", text: "Sir, good morning", time: "8:01 AM" }],
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
    <div
      className="
        bg-white dark:bg-gray-900 
        text-gray-900 dark:text-white
        rounded-2xl shadow-xl border dark:border-gray-700
        flex h-[480px]
      "
    >
      {/* LEFT CHAT AREA */}
      <div
        className="
          w-2/3 
          border-r dark:border-gray-700 
          flex flex-col 
          bg-gray-100 dark:bg-gray-800
        "
      >
        {/* HEADER */}
        <div
          className="
            p-3 bg-[#0f1b2a] 
            text-white flex justify-between items-center
          "
        >
          <h2 className="font-semibold">
            Chat with {chatUsers.find((u) => u.id === activeUser)?.name}
          </h2>

          <button
            onClick={refreshChats}
            className="text-sm bg-white text-black px-3 py-1 rounded"
          >
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
              {/* DELETE ONLY YOUR MESSAGE */}
              {m.from === "You" && (
                <button
                  onClick={() => deleteMessage(idx)}
                  className="text-red-500 dark:text-red-400 text-xs"
                >
                  🗑
                </button>
              )}

              <div
                className={`
                  max-w-xs px-3 py-2 rounded-lg text-sm shadow 
                  ${
                    m.from === "You"
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  }
                `}
              >
                <div className="text-[10px] opacity-70 font-semibold mb-1">
                  {m.from} • {m.time}
                </div>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT BOX */}
        <div
          className="
            border-t dark:border-gray-700 
            p-3 flex gap-2 
            bg-white dark:bg-gray-700
          "
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="
              flex-1 border rounded-lg px-3 py-2 text-sm 
              bg-white dark:bg-gray-600 
              text-black dark:text-white
              border-gray-300 dark:border-gray-500
            "
          />

          <button
            onClick={sendMessage}
            className="
              bg-blue-600 text-white px-4 py-2 rounded-lg text-sm
              hover:bg-blue-700
            "
          >
            Send
          </button>
        </div>
      </div>

      {/* RIGHT USER LIST */}
      <div
        className="
          w-1/3 p-4 
          bg-white dark:bg-gray-800
          border-l dark:border-gray-700
        "
      >
        <h3 className="font-semibold text-sm mb-3">Initiated Chats</h3>

        <ul className="space-y-2 text-sm">
          {chatUsers.map((u) => (
            <li
              key={u.id}
              onClick={() => setActiveUser(u.id)}
              className={`
                border rounded-lg px-3 py-2 cursor-pointer 
                ${
                  activeUser === u.id
                    ? "bg-blue-100 dark:bg-blue-900 border-blue-600"
                    : "bg-gray-50 dark:bg-gray-700"
                }
                border-gray-300 dark:border-gray-600
              `}
            >
              {u.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
