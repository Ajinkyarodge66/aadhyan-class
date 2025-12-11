import PageWrapper from "../components/PageWrapper.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth token demo
    localStorage.removeItem("token");
    const timer = setTimeout(() => navigate("/dashboard"), 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageWrapper title="Logout">
      <div className="bg-white rounded-2xl shadow-xl border px-8 py-8 max-w-md">
        <p className="text-sm text-gray-700">
          You have been logged out (demo). Redirecting to dashboard...
        </p>
      </div>
    </PageWrapper>
  );
}