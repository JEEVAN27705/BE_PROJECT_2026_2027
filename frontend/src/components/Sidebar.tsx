import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="sidebar">

      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-mark">
          <span>✦</span>
        </div>

        <div className="brand-content">
          <h1>AI Knowledge</h1>
          <h1>Assistant</h1>
          <span>HR Workspace</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">

        <div className="nav-label">
          Workspace
        </div>

        <NavLink
          to="/hr/dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <span className="nav-icon">
            <svg viewBox="0 0 24 24">
              <path d="M3 11.5L12 4l9 7.5" />
              <path d="M5.5 10.5V20h13v-9.5" />
              <path d="M9.5 20v-5h5v5" />
            </svg>
          </span>

          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/hr/create-credentials"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <span className="nav-icon">
            <svg viewBox="0 0 24 24">
              <circle cx="9" cy="8" r="3" />
              <path d="M3.5 20c.5-3.2 2.4-5 5.5-5s5 1.8 5.5 5" />
              <path d="M18 8v6" />
              <path d="M15 11h6" />
            </svg>
          </span>

          <span>Create Employee</span>
        </NavLink>

        <NavLink
          to="/hr/manage-credentials"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <span className="nav-icon">
            <svg viewBox="0 0 24 24">
              <circle cx="8" cy="8" r="3" />
              <path d="M2.5 20c.5-3.2 2.5-5 5.5-5s5 1.8 5.5 5" />
              <circle cx="17" cy="9" r="2.5" />
              <path d="M14.5 20c.3-2.5 1.4-4 3.5-4s3.2 1.5 3.5 4" />
            </svg>
          </span>

          <span>Manage Employee</span>
        </NavLink>

        <NavLink
          to="/employee"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <span className="nav-icon">
            <svg viewBox="0 0 24 24">
              <path d="M5 6.5h14v10H9l-4 3v-13z" />
              <path d="M8 11h.01" />
              <path d="M12 11h.01" />
              <path d="M16 11h.01" />
            </svg>
          </span>

          <span>AI Assistant</span>
        </NavLink>

      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <span className="nav-icon">
            <svg viewBox="0 0 24 24">
              <path d="M10 4H5v16h5" />
              <path d="M14 8l4 4-4 4" />
              <path d="M8 12h10" />
            </svg>
          </span>

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;