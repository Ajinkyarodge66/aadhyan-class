import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const handleLogin = (e) => {
  e.preventDefault();

  const storedUser = JSON.parse(localStorage.getItem("userData"));

  if (!storedUser) {
    setError("No user found! Please signup first.");
    return;
  }

  if (
    storedUser.username === username.trim() &&
    storedUser.password === password
  ) {
    localStorage.setItem("isLoggedIn", "true");

    // 🔥 FIX: Force Reload so App.jsx detects login
    navigate("/dashboard", { replace: true });


  } else {
    setError("Invalid username or password!");
  }
};

  
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-700">
      
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-[420px] p-10 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl"
      >
        <h2 className="text-white text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        {error && <p className="text-red-200 text-center mb-4">{error}</p>}

        <label className="text-white font-medium">Username</label>
        <input
          type="text"
          className="w-full mt-2 mb-4 p-3 rounded-lg bg-white/80 text-black shadow"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="text-white font-medium">Password</label>
        <input
          type="password"
          className="w-full mt-2 mb-6 p-3 rounded-lg bg-white/80 text-black shadow"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-white text-indigo-700 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition"
        >
          LOGIN
        </button>

        <p className="text-center text-white mt-4">
          Don't have an account?{" "}
          <span
            className="font-semibold underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}

