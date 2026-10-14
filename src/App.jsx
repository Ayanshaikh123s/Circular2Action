import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import AdminDashboard from "./AdminDashboard";
import UploadCircular from "./UploadCircular";
import CircularList from "./CircularList";
import Categories from "./Categories";
import ActionItems from "./ActionItems";
import Notifications from "./Notifications";
import Students from "./Students";
import Analytics from "./Analytics";
import Profile from "./Profile";

import StudentDashboard from "./StudentDashboard";
import MyCirculars from "./MyCirculars";
import ImportantCirculars from "./ImportantCirculars";
import CircularHistory from "./CircularHistory";
import MyActions from "./MyActions";
import PendingActions from "./PendingActions";
import CompletedActions from "./CompletedActions";
import StudentNotifications from "./StudentNotifications";
import AcademicCalendar from "./AcademicCalendar";
import ImportantDates from "./ImportantDates";
import StudentProfile from "./StudentProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/upload-circular"
          element={<UploadCircular />}
        />
        <Route
  path="/circular-list"
  element={<CircularList />}
/>
<Route
  path="/categories"
  element={<Categories />}
/>
<Route
  path="/action-items"
  element={<ActionItems />}
/>
<Route
  path="/notifications"
  element={<Notifications />}
/>
<Route
  path="/students"
  element={<Students />}
/>
<Route
  path="/analytics"
  element={<Analytics />}
/>
<Route path="/profile" element={<Profile />} />
<Route
  path="/student-dashboard"
  element={<StudentDashboard />}
/>
<Route
  path="/my-circulars"
  element={<MyCirculars />}
/>
<Route
  path="/important-circulars"
  element={<ImportantCirculars />}
/>
<Route
  path="/circular-history"
  element={<CircularHistory />}
/>
<Route path="/my-actions" element={<MyActions />} />
<Route path="/pending-actions" element={<PendingActions />} />
<Route
  path="/completed-actions"
  element={<CompletedActions />}
/>
<Route
  path="/student-notifications"
  element={<StudentNotifications />}
/>
<Route path="/academic-calendar" element={<AcademicCalendar />} />
<Route path="/important-dates" element={<ImportantDates />} />
<Route path="/student-profile" element={<StudentProfile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;