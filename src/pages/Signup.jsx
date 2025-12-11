import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    confirmPass: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const username = form.username.trim();
    const password = form.password;
    const confirmPass = form.confirmPass;

    // VALIDATIONS
    if (!name || !username || !password || !confirmPass) {
      setError("All fields are required!");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters!");
      return;
    }

    if (password !== confirmPass) {
      setError("Passwords do not match!");
      return;
    }

    // CHECK IF USER ALREADY EXISTS
    const existingUser = JSON.parse(localStorage.getItem("userData"));
    if (existingUser && existingUser.username === username) {
      setError("Username already exists! Try another.");
      return;
    }

    // SAVE NEW USER
    localStorage.setItem(
      "userData",
      JSON.stringify({ name, username, password })
    );

    alert("Signup Successful! Please Login.");
    navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">

      <form
        onSubmit={handleSignup}
        className="w-[420px] p-10 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/30 shadow-xl"
      >
        <h2 className="text-white text-3xl font-bold text-center mb-6">
          Create Account ✨
        </h2>

        {error && <p className="text-red-200 text-center mb-4">{error}</p>}

        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-white/80"
          placeholder="Full Name"
        />

        <input
          type="text"
          name="username"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-white/80"
          placeholder="Username"
        />

        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-white/80"
          placeholder="Password"
        />

        <input
          type="password"
          name="confirmPass"
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded-lg bg-white/80"
          placeholder="Confirm Password"
        />

        <button
          type="submit"
          className="w-full bg-white text-purple-700 py-3 rounded-lg font-semibold"
        >
          SIGNUP
        </button>

        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
