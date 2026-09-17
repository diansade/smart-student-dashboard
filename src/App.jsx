import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";

import ProtectedRoute from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";

import AppLayout from "./layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Goals from "./pages/Goals";
import StudyTracker from "./pages/StudyTracker";
import CGPA from "./pages/CGPA";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* App pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="goals" element={<Goals />} />
            <Route path="study" element={<StudyTracker />} />
            <Route path="cgpa" element={<CGPA />} />
            <Route path="resources" element={<Resources />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
