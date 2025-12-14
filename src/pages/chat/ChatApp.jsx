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

  // ⭐ Help Modal state
  const [openInfo, setOpenInfo] = useState(false);

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
    <>
      {/* MAIN CHAT LAYOUT */}
      <div
        className="
          bg-white dark:bg-gray-900 
          text-gray-900 dark:text-white
          rounded-2xl shadow-xl border dark:border-gray-700
          flex h-[480px] relative
        "
      >
        {/* ⭐ Top-Right Info Button */}
        <button
          onClick={() => setOpenInfo(true)}
          className="
            absolute right-3 top-3
            w-9 h-9 flex items-center justify-center 
            rounded-full text-lg
            bg-gradient-to-br from-blue-600 to-blue-700
            text-white shadow hover:scale-110 transition
          "
        >
          ℹ️
        </button>

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
                {/* DELETE ONLY YOUR OWN MESSAGES */}
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

        {/* RIGHT SIDE CONTACT LIST */}
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

      {/* ⭐ HELP MODAL */}
      {openInfo && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-[#140028] text-black dark:text-white 
                          w-[90%] max-w-md p-6 rounded-2xl shadow-xl 
                          border dark:border-gray-700 animate-modalSlideUp">

            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-3">
              How to Use Chat Module
            </h2>

            <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <p>💬 This module allows Student & Teacher messaging.</p>
              <p><b>1️⃣ Select User:</b> Click right panel user to load chat.</p>
              <p><b>2️⃣ Send Message:</b> Type below & click SEND.</p>
              <p><b>3️⃣ Delete Your Message:</b> Only your messages show 🗑 icon.</p>
              <p><b>4️⃣ Refresh:</b> Reloads chat (demo mode).</p>
              <p><b>5️⃣ Auto Scroll:</b> Chat always scrolls to bottom.</p>
            </div>

            <button
              onClick={() => setOpenInfo(false)}
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 
                         text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
