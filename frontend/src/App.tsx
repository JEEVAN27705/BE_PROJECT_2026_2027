import { BrowserRouter, Routes, Route, Navigate,} from 'react-router-dom';
import Login from './pages/Login';
import EmployeeChat from './pages/EmployeeChat';
import HRDashboard from './pages/hr/HRDashboard';
import CreateCredentials from './pages/hr/CreateCredentials';
import ManageCredentials from './pages/hr/ManageCredentials';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/employee"
          element={<EmployeeChat />}
        />

        {/* HR Routes */}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;