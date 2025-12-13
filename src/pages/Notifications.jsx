import { useState, useEffect } from "react";

export default function Notifications() {
  const [settings, setSettings] = useState({
    announcements: true,
    assignments: true,
    chatMessages: true,
    examUpdates: false,
  });

  // Load saved settings
  useEffect(() => {
    const saved = localStorage.getItem("notificationSettings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  // Save settings
  const saveSettings = () => {
    localStorage.setItem("notificationSettings", JSON.stringify(settings));
    alert("Notification Preferences Saved!");
  };

  return (
    <div className="dark:text-white">
      <h2 className="text-2xl font-semibold mb-6">Notification Settings</h2>

      {/* CARD */}
      <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl shadow space-y-6">

        {/* ANNOUNCEMENTS */}
        <div className="flex justify-between items-center">
          <span className="text-lg">Announcements</span>
          <input
            type="checkbox"
            checked={settings.announcements}
            onChange={(e) =>
              setSettings({ ...settings, announcements: e.target.checked })
            }
            className="w-5 h-5"
          />
        </div>

        {/* ASSIGNMENTS */}
        <div className="flex justify-between items-center">
          <span className="text-lg">Assignment Notifications</span>
          <input
            type="checkbox"
            checked={settings.assignments}
            onChange={(e) =>
              setSettings({ ...settings, assignments: e.target.checked })
            }
            className="w-5 h-5"
          />
        </div>

        {/* CHAT MESSAGES */}
        <div className="flex justify-between items-center">
          <span className="text-lg">Chat Message Alerts</span>
          <input
            type="checkbox"
            checked={settings.chatMessages}
            onChange={(e) =>
              setSettings({ ...settings, chatMessages: e.target.checked })
            }
            className="w-5 h-5"
          />
        </div>

        {/* EXAM UPDATES */}
        <div className="flex justify-between items-center">
          <span className="text-lg">Exam Updates</span>
          <input
            type="checkbox"
            checked={settings.examUpdates}
            onChange={(e) =>
              setSettings({ ...settings, examUpdates: e.target.checked })
            }
            className="w-5 h-5"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveSettings}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

