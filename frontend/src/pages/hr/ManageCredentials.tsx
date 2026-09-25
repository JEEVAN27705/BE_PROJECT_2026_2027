import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './styles/ManageCredentials.css';

const employees = [
  {
    initials: 'AM',
    name: 'Alex Morgan',
    email: 'alex.morgan@cognishield.enterprise',
    role: 'HR Director',
    domain: 'People Operations & Strategy',
    status: 'Active',
    avatarColor: 'bg-indigo-100 text-indigo-700'
  },
  {
    initials: 'SC',
    name: 'Sarah Chen',
    email: 'sarah.chen@cognishield.enterprise',
    role: 'Staff Architect',
    domain: 'Cloud Infrastructure',
    status: 'Handover',
    avatarColor: 'bg-cyan-100 text-cyan-700'
  },
  {
    initials: 'MB',
    name: 'Marcus Brody',
    email: 'marcus.brody@cognishield.enterprise',
    role: 'Stakeholder',
    domain: 'Finance & Audit Advisory',
    status: 'Active',
    avatarColor: 'bg-gray-100 text-gray-700'
  },
  {
    initials: 'ER',
    name: 'Elena Rostova',
    email: 'elena.rostova@cognishield.enterprise',
    role: 'Growth Lead',
    domain: 'Business Development',
    status: 'Active',
    avatarColor: 'bg-purple-100 text-purple-700'
  },
  {
    initials: 'KT',
    name: 'Kenji Takahashi',
    email: 'k.takahashi@cognishield.enterprise',
    role: 'Data Engineer Intern',
    domain: 'Machine Learning Ops',
    status: 'Onboarding',
    avatarColor: 'bg-blue-100 text-blue-700'
  },
  {
    initials: 'AO',
    name: 'Amara Okafor',
    email: 'amara.okafor@cognishield.enterprise',
    role: 'Security Specialist',
    domain: 'Cybersec & Governance',
    status: 'Active',
    avatarColor: 'bg-indigo-100 text-indigo-700'
  },
  {
    initials: 'DM',
    name: 'David Miller',
    email: 'david.miller@cognishield.enterprise',
    role: 'Product Designer',
    domain: 'Design System Team',
    status: 'Active',
    avatarColor: 'bg-gray-100 text-gray-700'
  }
];

function ManageCredentials() {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  return (
    <div className="manage-employees-page">
      <Sidebar />
      <main className="manage-employees-content">
        <div className="breadcrumb">
          <span className="breadcrumb-main">HR MODULE</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-sub">DIRECTORY</span>
        </div>

        <div className="page-header">
          <h1>Manage Employees</h1>
          <p>View, filter, edit, and manage employee records, organizational roles, and tacit knowledge retention health.</p>
        </div>

        <div className="search-filter-bar">
          <div className="search-input-wrapper">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Search by name, email, designation, or ID..." />
          </div>
          <div className="role-filter">
            <span>All Roles</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div className="employee-table-container">
          <div className="table-responsive-wrapper">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>EMPLOYEE DETAILS</th>
                  <th>ROLE & DOMAIN</th>
                  <th>STATUS</th>
                  <th className="text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, index) => (
                  <tr key={index}>
                    <td>
                      <div className="employee-details">
                        <div className={`avatar ${emp.avatarColor}`}>
                          {emp.initials}
                        </div>
                        <div className="employee-info">
                          <span className="employee-name">{emp.name}</span>
                          <span className="employee-email">{emp.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="role-domain">
                        <span className="role-name">{emp.role}</span>
                        <span className="domain-name">{emp.domain}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${emp.status.toLowerCase()}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button 
                        className="view-profile-btn" 
                        onClick={() => setSelectedEmployee(emp)}
                      >
                        View Profile
                      </button>
                      <button className="more-options-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="12" cy="5" r="1"></circle>
                          <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-footer">
            <div className="pagination-info">
              Showing <strong>1 to 8</strong> of <strong>148</strong> employees <span className="bullet">•</span> Per page: <span className="per-page-box">8</span>
            </div>
            <div className="pagination-controls">
              <button className="page-nav-btn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button className="page-number active">1</button>
              <button className="page-number">2</button>
              <button className="page-number">3</button>
              <span className="page-ellipsis">...</span>
              <button className="page-number">19</button>
              <button className="page-nav-btn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Popup Overlay */}
      {selectedEmployee && (
        <div className="popup-overlay" onClick={() => setSelectedEmployee(null)}>
          <div className="popup-modal" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setSelectedEmployee(null)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <div className="popup-header">
              <div className={`popup-avatar ${selectedEmployee.avatarColor}`}>
                {selectedEmployee.initials}
              </div>
              <div className="popup-header-info">
                <div className="popup-title-row">
                  <h2>Edit Employee Details</h2>
                  <span className={`status-badge ${selectedEmployee.status.toLowerCase()}`}>
                    {selectedEmployee.status}
                  </span>
                </div>
                <p>Update personal records, organizational role, and credentials for {selectedEmployee.name}</p>
              </div>
            </div>

            <div className="popup-body">
              {/* Section 1: Personal & Contact Information */}
              <div className="popup-section">
                <h3 className="section-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  Personal & Contact Information
                </h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue={selectedEmployee.name} />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="text" defaultValue={selectedEmployee.email} />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <div className="mobile-input-group">
                      <input type="text" defaultValue="+91" className="country-code" />
                      <input type="text" defaultValue="9845012384" className="phone-number" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="text" defaultValue="04/12/1992" />
                  </div>
                  <div className="form-group full-width">
                    <label>Address / Location Code</label>
                    <input type="text" defaultValue="MR76+3QX" />
                  </div>
                </div>
              </div>

              {/* Section 2: Attributes & Demographics */}
              <div className="popup-section">
                <h3 className="section-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  Attributes & Demographics
                </h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Gender</label>
                    <div className="segmented-control">
                      <button className="segment">Male</button>
                      <button className="segment active">Female</button>
                      <button className="segment">Other</button>
                    </div>
                  </div>
                  <div className="form-group full-width">
                    <label>User Type</label>
                    <div className="segmented-control">
                      <button className="segment active">College Student</button>
                      <button className="segment">Professional</button>
                      <button className="segment">School Student</button>
                      <button className="segment">Teacher</button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input type="text" defaultValue="Open" />
                  </div>
                  <div className="form-group">
                    <label>Marital Status</label>
                    <input type="text" defaultValue="Single / Unmarried" />
                  </div>
                  <div className="form-group">
                    <label>Career Break</label>
                    <input type="text" defaultValue="None (0 months)" />
                  </div>
                  <div className="form-group">
                    <label>Work Permit / Residency</label>
                    <input type="text" defaultValue="Citizen (Domestic)" />
                  </div>
                  <div className="form-group full-width">
                    <label>Languages Spoken</label>
                    <div className="tags-input">
                      <span className="tag">English <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>
                      <span className="tag">Hindi <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>
                      <span className="tag">Marathi <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>
                      <button className="add-tag-btn">+Add</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Organization & Role Details */}
              <div className="popup-section">
                <h3 className="section-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                  Organization & Role Details
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageCredentials;