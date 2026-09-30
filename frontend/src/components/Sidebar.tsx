import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const { logout, role } = useAuth();

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
          <span>
            {role === 'hr'
              ? 'HR Workspace'
              : role === 'team_lead'
              ? 'Team Lead Workspace'
              : role === 'manager'
              ? 'Manager Workspace'
              : 'Workspace'}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">

        <div className="nav-label">
          Workspace
        </div>

        {/* ==================== HR ==================== */}
        {role === 'hr' && (
          <>
            {/* Dashboard */}
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

            {/* Create Employee */}
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

            {/* Manage Employee */}
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

            {/* AI Assistant */}
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
          </>
        )}

        {/* ==================== TEAM LEAD ==================== */}
        {role === 'team_lead' && (
          <>
            {/* Dashboard */}
            <NavLink
              to="/team-lead/dashboard"
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

            {/* Manage Employee */}
            <NavLink
              to="/team-lead/manage-employee"
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

            {/* AI Assistant */}
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

            {/* Upload Files */}
            <NavLink
              to="/files/upload"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 16V4" />
                  <path d="M7 9l5-5 5 5" />
                  <path d="M5 14v5h14v-5" />
                </svg>
              </span>

              <span>Upload Files</span>
            </NavLink>

            {/* Manage Files */}
            <NavLink
              to="/files/manage"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M4 5h16v14H4z" />
                  <path d="M8 9h8" />
                  <path d="M8 13h6" />
                </svg>
              </span>

              <span>Manage Files</span>
            </NavLink>

            {/* Project Tracker */}
            <NavLink
              to="/team-lead/project-tracker"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M4 19V5" />
                  <path d="M4 18h16" />
                  <path d="M7 15l4-4 3 2 5-6" />
                </svg>
              </span>

              <span>Project Tracker</span>
            </NavLink>
          </>
        )}

        {/* ==================== MANAGER ==================== */}
        {role === 'manager' && (
          <>
            {/* Dashboard */}
            <NavLink
              to="/manager/dashboard"
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

            {/* Manage Employee */}
            <NavLink
              to="/manager/manage-employee"
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

            {/* AI Assistant */}
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

            {/* Upload Files */}
            <NavLink
              to="/files/upload"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 16V4" />
                  <path d="M7 9l5-5 5 5" />
                  <path d="M5 14v5h14v-5" />
                </svg>
              </span>

              <span>Upload Files</span>
            </NavLink>

            {/* Manage Files */}
            <NavLink
              to="/files/manage"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M4 5h16v14H4z" />
                  <path d="M8 9h8" />
                  <path d="M8 13h6" />
                </svg>
              </span>

              <span>Manage Files</span>
            </NavLink>

            {/* Project Tracker */}
            <NavLink
              to="/manager/project-tracker"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M4 19V5" />
                  <path d="M4 18h16" />
                  <path d="M7 15l4-4 3 2 5-6" />
                </svg>
              </span>

              <span>Project Tracker</span>
            </NavLink>
          </>
        )}

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