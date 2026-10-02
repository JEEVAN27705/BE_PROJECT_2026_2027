import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import EmployeeChat from './pages/EmployeeChat';

import HRDashboard from './pages/hr/HRDashboard';
import CreateCredentials from './pages/hr/CreateCredentials';
import ManageCredentials from './pages/hr/ManageCredentials';

import TeamLeadDashboard from './pages/team-lead/TeamLeadDashboard';

import UploadDocuments from './pages/common/upload/UploadDocuments';
import ManageDocuments from './pages/common/manage/ManageDocuments';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Employee */}
        <Route
          path="/employee"
          element={<EmployeeChat />}
        />

        {/* ================= HR ================= */}

        <Route
          path="/hr/dashboard"
          element={<HRDashboard />}
        />

        <Route
          path="/hr/create-credentials"
          element={<CreateCredentials />}
        />

        <Route
          path="/hr/manage-credentials"
          element={<ManageCredentials />}
        />

        {/* ================= TEAM LEAD ================= */}

        <Route
          path="/team-lead/dashboard"
          element={<TeamLeadDashboard />}
        />

        {/* ================= COMMON DOCUMENTS ================= */}

        <Route
          path="/documents/upload"
          element={<UploadDocuments />}
        />

        <Route
          path="/documents/manage"
          element={<ManageDocuments />}
        />

        {/* ================= FUTURE ROUTES ================= */}

        <Route
          path="/manager"
          element={<div>Manager Dashboard</div>}
        />

        <Route
          path="/stakeholder"
          element={<div>Stakeholder Dashboard</div>}
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;