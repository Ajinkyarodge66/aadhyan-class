import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Layout
import Sidebar from "./components/Sidebar.jsx";
import PageWrapper from "./components/PageWrapper.jsx";

// Dashboard
import Dashboard from "./pages/Dashboard.jsx";

// Study Material
import CreateLesson from "./pages/studyMaterial/CreateLesson.jsx";
import Topic from "./pages/studyMaterial/Topic.jsx";

// Classroom
import CreateTimetable from "./pages/classroom/CreateTimetable.jsx";

// Attendance
import AttendanceOverview from "./pages/attendance/AttendanceOverview.jsx";

// Assignment
import CreateAssignment from "./pages/assignment/CreateAssignment.jsx";
import AssignmentView from "./pages/assignment/AssignmentView.jsx";

// Examination
import Exams from "./pages/examination/Exams.jsx";

// Others
import Announcements from "./pages/announcements/Announcements.jsx";
import CreateAnnouncement from "./pages/announcements/CreateAnnouncement.jsx";
import ChatApp from "./pages/chat/ChatApp.jsx";
import AdmitCard from "./pages/admitCard/AdmitCard.jsx";
import Logout from "./pages/Logout.jsx";

// Card Pages
import Subjects from "./pages/Subjects.jsx";
import Classes from "./pages/Classes.jsx";
import AssignmentProgressPage from "./pages/AssignmentProgressPage.jsx";
import TimetablePage from "./pages/TimetablePage.jsx";

import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Settings from "./pages/Settings.jsx";

export default function App() {
  const { pathname } = useLocation();

  // CHECK LOGIN STATUS
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // PAGES WITHOUT SIDEBAR
  const noSidebar = ["/login", "/signup"];
  const hideSidebar = noSidebar.includes(pathname);

  // PROTECTED ROUTE WRAPPER
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <div className="flex">

      {/* SIDEBAR ONLY WHEN LOGGED IN */}
      {!hideSidebar && isLoggedIn && (
        <div className="fixed left-0 top-0 h-screen w-64">
          <Sidebar />
        </div>
      )}

      <div className={`${!hideSidebar && isLoggedIn ? "ml-64" : ""} w-full`}>

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* PRIVATE ROUTES BELOW */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PageWrapper title="Wims Teacher Panel">
                  <Dashboard />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/subjects"
            element={
              <ProtectedRoute>
                <PageWrapper title="Subjects">
                  <Subjects />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/classes"
            element={
              <ProtectedRoute>
                <PageWrapper title="Classes">
                  <Classes />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/assignment-progress"
            element={
              <ProtectedRoute>
                <PageWrapper title="Assignment Progress">
                  <AssignmentProgressPage />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/timetable"
            element={
              <ProtectedRoute>
                <PageWrapper title="Time Table">
                  <TimetablePage />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-timetable"
            element={
              <ProtectedRoute>
                <PageWrapper title="Create Time Table">
                  <CreateTimetable />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <PageWrapper title="Attendance Overview">
                  <AttendanceOverview />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/lesson"
            element={
              <ProtectedRoute>
                <PageWrapper title="Lesson">
                  <CreateLesson />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/topic"
            element={
              <ProtectedRoute>
                <PageWrapper title="Topic">
                  <Topic />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-assignment"
            element={
              <ProtectedRoute>
                <PageWrapper title="Create Assignment">
                  <CreateAssignment />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/assignment-view"
            element={
              <ProtectedRoute>
                <PageWrapper title="View Assignments">
                  <AssignmentView />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/exams"
            element={
              <ProtectedRoute>
                <PageWrapper title="Examination Details">
                  <Exams />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/announcements"
            element={
              <ProtectedRoute>
                <PageWrapper title="Announcements">
                  <Announcements />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-announcement"
            element={
              <ProtectedRoute>
                <PageWrapper title="Create Announcement">
                  <CreateAnnouncement />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <PageWrapper title="Chat App">
                  <ChatApp />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admit-card"
            element={
              <ProtectedRoute>
                <PageWrapper title="Admit Card">
                  <AdmitCard />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
<Route path="/" element={<Navigate to="/login" replace />} />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <PageWrapper title="Settings">
                  <Settings />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          {/* LOGOUT */}
          <Route path="/logout" element={<Logout />} />

          {/* DEFAULT */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </div>
    </div>
  );
}

