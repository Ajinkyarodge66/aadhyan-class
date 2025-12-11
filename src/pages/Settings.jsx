import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");

  // ---------------- PROFILE STATE ----------------
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const handleProfileSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Profile Updated Successfully!");
  };

  // ---------------- PASSWORD STATE ----------------
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handlePasswordUpdate = () => {
    if (passwords.newPass !== passwords.confirm) {
      alert("New Password & Confirm Password do not match!");
      return;
    }

    if (passwords.newPass.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    alert("Password Updated Successfully!");
    setPasswords({ current: "", newPass: "", confirm: "" });
  };

  // ---------------- GLOBAL THEME SYSTEM ----------------
  const toggleTheme = () => {
    const html = document.documentElement;
    const enableDark = html.classList.toggle("dark");

    localStorage.setItem("theme", enableDark ? "dark" : "light");
  };

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="p-6 dark:text-white">

      <h1 className="text-4xl font-bold mb-6">Settings</h1>

      {/* ------- TAB BUTTONS ------- */}
      <div className="flex gap-4 mb-8">
        <TabButton id="profile" activeTab={activeTab} setActiveTab={setActiveTab} label="Profile Settings" />
        <TabButton id="password" activeTab={activeTab} setActiveTab={setActiveTab} label="Change Password" />
        <TabButton id="theme" activeTab={activeTab} setActiveTab={setActiveTab} label="Theme" />
        <TabButton id="notifications" activeTab={activeTab} setActiveTab={setActiveTab} label="Notifications" />
        <TabButton id="logout" activeTab={activeTab} setActiveTab={setActiveTab} label="Logout" />
      </div>

      {/* ------- TAB CONTENT ------- */}
      <div className="bg-white dark:bg-[#1e1e1e] shadow-xl p-8 rounded-2xl">

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Profile Information</h2>

            <div className="space-y-5">
              <div>
                <label className="font-medium">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full mt-1 p-3 border rounded-lg dark:bg-[#333] dark:text-white dark:border-gray-600"
                />
              </div>

              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="Enter email address"
                  className="w-full mt-1 p-3 border rounded-lg dark:bg-[#333] dark:text-white dark:border-gray-600"
                />
              </div>

              <div>
                <label className="font-medium">Phone</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="w-full mt-1 p-3 border rounded-lg dark:bg-[#333] dark:text-white dark:border-gray-600"
                />
              </div>

              <button onClick={handleProfileSave} className="px-6 py-3 bg-blue-600 text-white rounded-lg">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* PASSWORD TAB */}
        {activeTab === "password" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Change Password</h2>

            <div className="space-y-5">
              <input type="password" placeholder="Current Password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-[#333] dark:text-white dark:border-gray-600"
              />

              <input type="password" placeholder="New Password"
                value={passwords.newPass}
                onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-[#333] dark:text-white dark:border-gray-600"
              />

              <input type="password" placeholder="Confirm New Password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-[#333] dark:text-white dark:border-gray-600"
              />

              <button onClick={handlePasswordUpdate} className="px-6 py-3 bg-blue-600 text-white rounded-lg">
                Update Password
              </button>
            </div>
          </div>
        )}

        {/* THEME TAB */}
        {activeTab === "theme" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Theme</h2>

            <button
              onClick={toggleTheme}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg dark:bg-yellow-400 dark:text-black"
            >
              Toggle Dark / Light Mode
            </button>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {activeTab === "notifications" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Notifications</h2>
            <p className="text-gray-600 dark:text-gray-300">Notification settings coming soon…</p>
          </div>
        )}

        {/* LOGOUT */}
        {activeTab === "logout" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Logout</h2>

            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 text-white rounded-lg"
            >
              Logout Now
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

function TabButton({ id, label, activeTab, setActiveTab }) {
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-2 rounded-lg font-medium transition-all 
      ${activeTab === id ? "bg-blue-600 text-white" : "bg-gray-300 dark:bg-gray-700 dark:text-white"}`}
    >
      {label}
    </button>
  );
}
