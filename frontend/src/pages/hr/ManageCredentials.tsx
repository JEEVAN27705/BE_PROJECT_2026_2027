import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './styles/ManageCredentials.css';

const employees = [
  {
    initials: 'RK',
    name: 'Rohan Kulkarni',
    email: 'rohan.kulkarni@cognishield.enterprise',
    role: 'Senior HR Manager',
    team: 'HR Operations',
    domain: 'Human Resources & Compliance',
    status: 'Active',
    avatarColor: 'bg-indigo-100 text-indigo-700'
  },
  {
    initials: 'NP',
    name: 'Neha Patel',
    email: 'neha.patel@cognishield.enterprise',
    role: 'Technical Lead',
    team: 'Cloud Migration',
    domain: 'Cloud Infrastructure',
    status: 'Handover',
    avatarColor: 'bg-cyan-100 text-cyan-700'
  },
  {
    initials: 'VS',
    name: 'Vikram Shah',
    email: 'vikram.shah@cognishield.enterprise',
    role: 'Business Analyst',
    team: 'Business Analytics',
    domain: 'Business Intelligence & Analytics',
    status: 'Active',
    avatarColor: 'bg-gray-100 text-gray-700'
  },
  {
    initials: 'PS',
    name: 'Priya Sharma',
    email: 'priya.sharma@cognishield.enterprise',
    role: 'Project Manager',
    team: 'Project Management',
    domain: 'Project Management & Operations',
    status: 'Active',
    avatarColor: 'bg-purple-100 text-purple-700'
  },
  {
    initials: 'AS',
    name: 'Arjun Singh',
    email: 'arjun.singh@cognishield.enterprise',
    role: 'Software Engineer Intern',
    team: 'Application Development',
    domain: 'Software Engineering',
    status: 'Onboarding',
    avatarColor: 'bg-blue-100 text-blue-700'
  },
  {
    initials: 'MK',
    name: 'Meera Kapoor',
    email: 'meera.kapoor@cognishield.enterprise',
    role: 'Security Engineer',
    team: 'Cybersecurity',
    domain: 'Information Security & Governance',
    status: 'Active',
    avatarColor: 'bg-indigo-100 text-indigo-700'
  },
  {
    initials: 'AD',
    name: 'Aditya Deshmukh',
    email: 'aditya.deshmukh@cognishield.enterprise',
    role: 'QA Engineer',
    team: 'QA & Testing',
    domain: 'Quality Assurance',
    status: 'Active',
    avatarColor: 'bg-gray-100 text-gray-700'
  }
];

function ManageCredentials() {
  const [selectedEmployee, setSelectedEmployee] =
    useState<any>(null);

  // Language dialog
  const [showAddDialog, setShowAddDialog] =
    useState(false);

  const [newLanguage, setNewLanguage] =
    useState('');

  const [languages, setLanguages] = useState([
    'English',
    'Hindi',
    'Marathi'
  ]);

  // Employee form states
  const [gender, setGender] =
    useState('Female');

  const [userType, setUserType] =
    useState('Intern');

  const [maritalStatus, setMaritalStatus] =
    useState('Single / Unmarried');

  const [dateOfBirth, setDateOfBirth] =
    useState('1992-12-04');

  const [employeeStatus, setEmployeeStatus] =
    useState('Active');

  const [password, setPassword] =
    useState('');

  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // Team
  const [teamName, setTeamName] =
    useState('Cloud Migration');

  // Work permit
  const [workPermit, setWorkPermit] =
    useState('Yes');

  // Address
  const [country, setCountry] =
    useState('India');

  const [state, setState] =
    useState('Maharashtra');

  return (
    <div className="manage-employees-page">

      <Sidebar />

      <main className="manage-employees-content">

        {/* ================= BREADCRUMB ================= */}

        <div className="breadcrumb">

          <span className="breadcrumb-main">
            HR MODULE
          </span>

          <span className="breadcrumb-separator">
            /
          </span>

          <span className="breadcrumb-sub">
            DIRECTORY
          </span>

        </div>


        {/* ================= PAGE HEADER ================= */}

        <div className="page-header">

          <h1>Manage Employees</h1>

          <p>
            View, filter, edit, and manage employee records,
            organizational roles, and tacit knowledge
            retention health.
          </p>

        </div>


        {/* ================= SEARCH ================= */}

        <div className="search-filter-bar">

          <div className="search-input-wrapper">

            <svg
              className="search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >

              <circle
                cx="11"
                cy="11"
                r="8"
              />

              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
              />

            </svg>

            <input
              type="text"
              placeholder="Search by name, email, designation, or ID..."
            />

          </div>


          <div className="role-filter">

            <span>All Roles</span>

            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >

              <polyline points="6 9 12 15 18 9" />

            </svg>

          </div>

        </div>


        {/* ================= EMPLOYEE TABLE ================= */}

        <div className="employee-table-container">

          <div className="table-responsive-wrapper">

            <table className="employee-table">

              <thead>

                <tr>

                  <th>
                    EMPLOYEE DETAILS
                  </th>

                  <th>
                    ROLE & DOMAIN
                  </th>

                  <th>
                    STATUS
                  </th>

                  <th className="text-right">
                    ACTIONS
                  </th>

                </tr>

              </thead>


              <tbody>

                {employees.map((emp, index) => (

                  <tr key={index}>

                    <td>

                      <div className="employee-details">

                        <div
                          className={`avatar ${emp.avatarColor}`}
                        >
                          {emp.initials}
                        </div>

                        <div className="employee-info">

                          <span className="employee-name">
                            {emp.name}
                          </span>

                          <span className="employee-email">
                            {emp.email}
                          </span>

                        </div>

                      </div>

                    </td>


                    <td>

                      <div className="role-domain">

                        <span className="role-name">
                          {emp.role}
                        </span>

                        <span className="domain-name">
                          {emp.domain}
                        </span>

                      </div>

                    </td>


                    <td>

                      <span
                        className={`status-badge ${emp.status.toLowerCase()}`}
                      >
                        {emp.status}
                      </span>

                    </td>


                    <td className="actions-cell">

                      <button
                        className="view-profile-btn"
                        onClick={() => {

                          setSelectedEmployee(emp);

                          setGender('Female');

                          setUserType('Intern');

                          setMaritalStatus(
                            'Single / Unmarried'
                          );

                          setDateOfBirth(
                            '1992-12-04'
                          );

                          setEmployeeStatus(
                            emp.status === 'Active'
                              ? 'Active'
                              : 'Inactive'
                          );

                          setTeamName(
                            emp.team
                          );

                          setWorkPermit('Yes');

                          setCountry('India');

                          setState('Maharashtra');

                          setPassword('');

                          setConfirmPassword('');

                        }}
                      >
                        View Profile
                      </button>


                      <button className="more-options-btn">

                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >

                          <circle
                            cx="12"
                            cy="12"
                            r="1"
                          />

                          <circle
                            cx="12"
                            cy="5"
                            r="1"
                          />

                          <circle
                            cx="12"
                            cy="19"
                            r="1"
                          />

                        </svg>

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* ================= PAGINATION ================= */}

          <div className="pagination-footer">

            <div className="pagination-info">

              Showing <strong>1 to 8</strong> of{' '}

              <strong>148</strong> employees{' '}

              <span className="bullet">
                •
              </span>{' '}

              Per page:

              <span className="per-page-box">
                8
              </span>

            </div>


            <div className="pagination-controls">

              <button className="page-nav-btn">

                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >

                  <polyline points="15 18 9 12 15 6" />

                </svg>

              </button>


              <button className="page-number active">
                1
              </button>

              <button className="page-number">
                2
              </button>

              <button className="page-number">
                3
              </button>

              <span className="page-ellipsis">
                ...
              </span>

              <button className="page-number">
                19
              </button>


              <button className="page-nav-btn">

                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >

                  <polyline points="9 18 15 12 9 6" />

                </svg>

              </button>

            </div>

          </div>

        </div>

      </main>


      {/* =====================================================
          EMPLOYEE EDIT POPUP
      ===================================================== */}

      {selectedEmployee && (

        <div
          className="popup-overlay"
          onClick={() =>
            setSelectedEmployee(null)
          }
        >

          <div
            className="popup-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* ================= CLOSE ================= */}

            <button
              className="popup-close"
              onClick={() =>
                setSelectedEmployee(null)
              }
            >

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >

                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                />

                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                />

              </svg>

            </button>


            {/* ================= HEADER ================= */}

            <div className="popup-header">

              <div
                className={`popup-avatar ${selectedEmployee.avatarColor}`}
              >
                {selectedEmployee.initials}
              </div>


              <div className="popup-header-info">

                <div className="popup-title-row">

                  <h2>
                    Edit Employee Details
                  </h2>

                  <span
                    className={`status-badge ${selectedEmployee.status.toLowerCase()}`}
                  >
                    {selectedEmployee.status}
                  </span>

                </div>


                <p>
                  Update personal records,
                  organizational role, and
                  credentials for{' '}
                  {selectedEmployee.name}
                </p>

              </div>

            </div>


            <div className="popup-body">


              {/* =================================================
                  SECTION 1: PERSONAL INFORMATION
              ================================================= */}

              <div className="popup-section">

                <h3 className="section-title">

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >

                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />

                    <circle
                      cx="12"
                      cy="7"
                      r="4"
                    />

                  </svg>

                  Personal & Contact Information

                </h3>


                <div className="form-grid">


                  {/* FULL NAME */}

                  <div className="form-group">

                    <label>
                      Full Name
                    </label>

                    <input
                      type="text"
                      defaultValue={
                        selectedEmployee.name
                      }
                    />

                  </div>


                  {/* EMAIL */}

                  <div className="form-group">

                    <label>
                      Email Address
                    </label>

                    <input
                      type="email"
                      defaultValue={
                        selectedEmployee.email
                      }
                    />

                  </div>


                  {/* MOBILE */}

                  <div className="form-group">

                    <label>
                      Mobile Number
                    </label>

                    <div className="mobile-input-group">

                      <input
                        type="text"
                        defaultValue="+91"
                        className="country-code"
                      />

                      <input
                        type="text"
                        defaultValue="9845012384"
                        className="phone-number"
                      />

                    </div>

                  </div>


                  {/* DATE OF BIRTH */}

                  <div className="form-group">

                    <label>
                      Date of Birth
                    </label>

                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) =>
                        setDateOfBirth(
                          e.target.value
                        )
                      }
                    />

                  </div>


                  {/* COUNTRY */}

                  <div className="form-group">

                    <label>
                      Country
                    </label>

                    <select
                      value={country}
                      onChange={(e) => {

                        const selectedCountry =
                          e.target.value;

                        setCountry(
                          selectedCountry
                        );

                        if (
                          selectedCountry ===
                          'India'
                        ) {
                          setState(
                            'Maharashtra'
                          );
                        }

                        else if (
                          selectedCountry ===
                          'United States'
                        ) {
                          setState(
                            'California'
                          );
                        }

                        else if (
                          selectedCountry ===
                          'United Kingdom'
                        ) {
                          setState(
                            'England'
                          );
                        }

                        else if (
                          selectedCountry ===
                          'Canada'
                        ) {
                          setState(
                            'Ontario'
                          );
                        }

                        else if (
                          selectedCountry ===
                          'Australia'
                        ) {
                          setState(
                            'New South Wales'
                          );
                        }

                      }}
                    >

                      <option value="India">
                        India
                      </option>

                      <option value="United States">
                        United States
                      </option>

                      <option value="United Kingdom">
                        United Kingdom
                      </option>

                      <option value="Canada">
                        Canada
                      </option>

                      <option value="Australia">
                        Australia
                      </option>

                    </select>

                  </div>


                  {/* STATE */}

                  <div className="form-group">

                    <label>
                      State
                    </label>

                    <select
                      value={state}
                      onChange={(e) =>
                        setState(
                          e.target.value
                        )
                      }
                    >

                      {/* INDIA */}

                      {country === 'India' && (
                        <>
                          <option value="Maharashtra">
                            Maharashtra
                          </option>

                          <option value="Karnataka">
                            Karnataka
                          </option>

                          <option value="Gujarat">
                            Gujarat
                          </option>

                          <option value="Delhi">
                            Delhi
                          </option>

                          <option value="Tamil Nadu">
                            Tamil Nadu
                          </option>

                          <option value="Telangana">
                            Telangana
                          </option>

                          <option value="Kerala">
                            Kerala
                          </option>

                          <option value="Rajasthan">
                            Rajasthan
                          </option>

                          <option value="West Bengal">
                            West Bengal
                          </option>

                          <option value="Uttar Pradesh">
                            Uttar Pradesh
                          </option>

                          <option value="Madhya Pradesh">
                            Madhya Pradesh
                          </option>

                          <option value="Goa">
                            Goa
                          </option>
                        </>
                      )}


                      {/* UNITED STATES */}

                      {country ===
                        'United States' && (
                        <>
                          <option value="California">
                            California
                          </option>

                          <option value="Texas">
                            Texas
                          </option>

                          <option value="New York">
                            New York
                          </option>

                          <option value="Florida">
                            Florida
                          </option>

                          <option value="Washington">
                            Washington
                          </option>

                          <option value="Illinois">
                            Illinois
                          </option>
                        </>
                      )}


                      {/* UNITED KINGDOM */}

                      {country ===
                        'United Kingdom' && (
                        <>
                          <option value="England">
                            England
                          </option>

                          <option value="Scotland">
                            Scotland
                          </option>

                          <option value="Wales">
                            Wales
                          </option>

                          <option value="Northern Ireland">
                            Northern Ireland
                          </option>
                        </>
                      )}


                      {/* CANADA */}

                      {country === 'Canada' && (
                        <>
                          <option value="Ontario">
                            Ontario
                          </option>

                          <option value="Quebec">
                            Quebec
                          </option>

                          <option value="British Columbia">
                            British Columbia
                          </option>

                          <option value="Alberta">
                            Alberta
                          </option>

                          <option value="Manitoba">
                            Manitoba
                          </option>
                        </>
                      )}


                      {/* AUSTRALIA */}

                      {country === 'Australia' && (
                        <>
                          <option value="New South Wales">
                            New South Wales
                          </option>

                          <option value="Victoria">
                            Victoria
                          </option>

                          <option value="Queensland">
                            Queensland
                          </option>

                          <option value="Western Australia">
                            Western Australia
                          </option>

                          <option value="South Australia">
                            South Australia
                          </option>
                        </>
                      )}

                    </select>

                  </div>


                  {/* ADDRESS */}

                  <div className="form-group full-width">

                    <label>
                      Address
                    </label>

                    <input
                      type="text"
                      defaultValue="Pimpri, Pune"
                      placeholder="Enter complete address"
                    />

                  </div>


                  {/* PINCODE */}

                  <div className="form-group">

                    <label>
                      PIN / ZIP Code
                    </label>

                    <input
                      type="text"
                      defaultValue="411018"
                      placeholder="Enter PIN / ZIP code"
                    />

                  </div>

                </div>

              </div>


              {/* =================================================
                  SECTION 2: ATTRIBUTES
              ================================================= */}

              <div className="popup-section">

                <h3 className="section-title">

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >

                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    />

                    <line
                      x1="16"
                      y1="2"
                      x2="16"
                      y2="6"
                    />

                    <line
                      x1="8"
                      y1="2"
                      x2="8"
                      y2="6"
                    />

                    <line
                      x1="3"
                      y1="10"
                      x2="21"
                      y2="10"
                    />

                  </svg>

                  Attributes & Demographics

                </h3>


                <div className="form-grid">


                  {/* GENDER */}

                  <div className="form-group">

                    <label>
                      Gender
                    </label>

                    <div className="segmented-control">

                      <button
                        type="button"
                        className={`segment ${
                          gender === 'Male'
                            ? 'active'
                            : ''
                        }`}
                        onClick={() =>
                          setGender('Male')
                        }
                      >
                        Male
                      </button>

                      <button
                        type="button"
                        className={`segment ${
                          gender === 'Female'
                            ? 'active'
                            : ''
                        }`}
                        onClick={() =>
                          setGender('Female')
                        }
                      >
                        Female
                      </button>

                      <button
                        type="button"
                        className={`segment ${
                          gender === 'Other'
                            ? 'active'
                            : ''
                        }`}
                        onClick={() =>
                          setGender('Other')
                        }
                      >
                        Other
                      </button>

                    </div>

                  </div>


                  {/* USER TYPE */}

                  <div className="form-group full-width">

                    <label>
                      User Type
                    </label>

                    <div className="segmented-control">

                      <button
                        type="button"
                        className={`segment ${
                          userType === 'Intern'
                            ? 'active'
                            : ''
                        }`}
                        onClick={() =>
                          setUserType('Intern')
                        }
                      >
                        Intern
                      </button>


                      <button
                        type="button"
                        className={`segment ${
                          userType ===
                          'Full-time Employee'
                            ? 'active'
                            : ''
                        }`}
                        onClick={() =>
                          setUserType(
                            'Full-time Employee'
                          )
                        }
                      >
                        Full-time Employee
                      </button>


                      <button
                        type="button"
                        className={`segment ${
                          userType ===
                          'Freelancer'
                            ? 'active'
                            : ''
                        }`}
                        onClick={() =>
                          setUserType(
                            'Freelancer'
                          )
                        }
                      >
                        Freelancer
                      </button>

                    </div>

                  </div>


                  {/* CATEGORY */}

                  <div className="form-group">

                    <label>
                      Category
                    </label>

                    <input
                      type="text"
                      defaultValue="Open"
                    />

                  </div>


                  {/* MARITAL STATUS */}

                  <div className="form-group">

                    <label>
                      Marital Status
                    </label>

                    <select
                      value={maritalStatus}
                      onChange={(e) =>
                        setMaritalStatus(
                          e.target.value
                        )
                      }
                    >

                      <option value="Single / Unmarried">
                        Single / Unmarried
                      </option>

                      <option value="Married">
                        Married
                      </option>

                      <option value="Divorced">
                        Divorced
                      </option>

                      <option value="Widowed">
                        Widowed
                      </option>

                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>

                    </select>

                  </div>


                  {/* TEAM NAME */}

                  <div className="form-group">

                    <label>
                      Team Name
                    </label>

                    <select
                      value={teamName}
                      onChange={(e) =>
                        setTeamName(
                          e.target.value
                        )
                      }
                    >

                      <option value="HR Operations">
                        HR Operations
                      </option>

                      <option value="Cloud Migration">
                        Cloud Migration
                      </option>

                      <option value="QA & Testing">
                        QA & Testing
                      </option>

                      <option value="Business Analytics">
                        Business Analytics
                      </option>

                      <option value="Project Management">
                        Project Management
                      </option>

                      <option value="Application Development">
                        Application Development
                      </option>

                      <option value="Cybersecurity">
                        Cybersecurity
                      </option>

                      <option value="Product Design">
                        Product Design
                      </option>

                      <option value="DevOps">
                        DevOps
                      </option>

                      <option value="Data Engineering">
                        Data Engineering
                      </option>

                    </select>

                  </div>


                  {/* WORK PERMIT */}

                  <div className="form-group">

                    <label>
                      Work Permit
                    </label>

                    <select
                      value={workPermit}
                      onChange={(e) =>
                        setWorkPermit(
                          e.target.value
                        )
                      }
                    >

                      <option value="Yes">
                        Yes
                      </option>

                      <option value="No">
                        No
                      </option>

                    </select>

                  </div>


                  {/* EMPLOYEE STATUS */}

                  <div className="form-group">

                    <label>
                      Employee Status
                    </label>

                    <select
                      value={employeeStatus}
                      onChange={(e) =>
                        setEmployeeStatus(
                          e.target.value
                        )
                      }
                    >

                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>

                      <option value="Temporary Blocked">
                        Temporary Blocked
                      </option>

                    </select>

                  </div>


                  {/* LANGUAGES */}

                  <div className="form-group full-width">

                    <label>
                      Languages Spoken
                    </label>

                    <div className="tags-input">

                      {languages.map(
                        (language, index) => (

                          <span
                            className="tag"
                            key={index}
                          >

                            {language}

                            <button
                              type="button"
                              className="remove-tag-btn"
                              onClick={() => {

                                setLanguages(
                                  languages.filter(
                                    (_, i) =>
                                      i !== index
                                  )
                                );

                              }}
                            >

                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >

                                <line
                                  x1="18"
                                  y1="6"
                                  x2="6"
                                  y2="18"
                                />

                                <line
                                  x1="6"
                                  y1="6"
                                  x2="18"
                                  y2="18"
                                />

                              </svg>

                            </button>

                          </span>

                        )
                      )}


                      <button
                        type="button"
                        className="add-tag-btn"
                        onClick={() => {

                          setNewLanguage('');

                          setShowAddDialog(
                            true
                          );

                        }}
                      >
                        +Add
                      </button>

                    </div>

                  </div>

                </div>

              </div>


              {/* =================================================
                  SECTION 3: CREDENTIALS
              ================================================= */}

              <div className="popup-section">

                <h3 className="section-title">

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >

                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="10"
                      rx="2"
                    />

                    <path d="M7 11V7a5 5 0 0110 0v4" />

                  </svg>

                  Credentials & Security

                </h3>


                <div className="form-grid">


                  {/* PASSWORD */}

                  <div className="form-group">

                    <label>
                      Set Password
                    </label>

                    <div className="password-input-wrapper">

                      <input
                        type={
                          showPassword
                            ? 'text'
                            : 'password'
                        }
                        value={password}
                        onChange={(e) =>
                          setPassword(
                            e.target.value
                          )
                        }
                        placeholder="Enter password"
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                      >
                        {showPassword
                          ? 'Hide'
                          : 'Show'}
                      </button>

                    </div>

                  </div>


                  {/* CONFIRM PASSWORD */}

                  <div className="form-group">

                    <label>
                      Re-type Password
                    </label>

                    <div className="password-input-wrapper">

                      <input
                        type={
                          showConfirmPassword
                            ? 'text'
                            : 'password'
                        }
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(
                            e.target.value
                          )
                        }
                        placeholder="Re-enter password"
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                      >
                        {showConfirmPassword
                          ? 'Hide'
                          : 'Show'}
                      </button>

                    </div>


                    {confirmPassword &&
                      password !==
                        confirmPassword && (

                        <span className="password-error">
                          Passwords do not match
                        </span>

                      )}


                    {confirmPassword &&
                      password ===
                        confirmPassword && (

                        <span className="password-success">
                          Passwords match
                        </span>

                      )}

                  </div>

                </div>

              </div>


              {/* =================================================
                  SAVE BUTTONS
              ================================================= */}

              <div className="popup-footer">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    setSelectedEmployee(null)
                  }
                >
                  Cancel
                </button>


                <button
                  type="button"
                  className="save-button"
                  disabled={
                    password !==
                      confirmPassword &&
                    confirmPassword !== ''
                  }
                  onClick={() => {

                    if (
                      password &&
                      password !==
                        confirmPassword
                    ) {
                      return;
                    }

                    alert(
                      'Employee details updated successfully!'
                    );

                    setSelectedEmployee(
                      null
                    );

                  }}
                >
                  Save Changes
                </button>

              </div>

            </div>


            {/* =================================================
                ADD LANGUAGE DIALOG
            ================================================= */}

            {showAddDialog && (

              <div
                className="add-dialog-overlay"
                onClick={() =>
                  setShowAddDialog(false)
                }
              >

                <div
                  className="add-dialog"
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                >

                  <div className="add-dialog-header">

                    <h3>
                      Add Language
                    </h3>

                    <button
                      type="button"
                      className="add-dialog-close"
                      onClick={() =>
                        setShowAddDialog(
                          false
                        )
                      }
                    >
                      ×
                    </button>

                  </div>


                  <div className="add-dialog-body">

                    <label htmlFor="language-input">
                      Enter language / code
                    </label>

                    <input
                      id="language-input"
                      type="text"
                      value={newLanguage}
                      onChange={(e) =>
                        setNewLanguage(
                          e.target.value
                        )
                      }
                      placeholder="e.g. Gujarati"
                      autoFocus
                      onKeyDown={(e) => {

                        if (
                          e.key === 'Enter'
                        ) {

                          const value =
                            newLanguage.trim();

                          if (
                            value &&
                            !languages.includes(
                              value
                            )
                          ) {

                            setLanguages([
                              ...languages,
                              value
                            ]);

                            setNewLanguage('');

                            setShowAddDialog(
                              false
                            );

                          }

                        }

                      }}
                    />

                  </div>


                  <div className="add-dialog-footer">

                    <button
                      type="button"
                      className="dialog-cancel-btn"
                      onClick={() =>
                        setShowAddDialog(
                          false
                        )
                      }
                    >
                      Cancel
                    </button>


                    <button
                      type="button"
                      className="dialog-add-btn"
                      onClick={() => {

                        const value =
                          newLanguage.trim();

                        if (!value) return;

                        if (
                          !languages.includes(
                            value
                          )
                        ) {

                          setLanguages([
                            ...languages,
                            value
                          ]);

                        }

                        setNewLanguage('');

                        setShowAddDialog(
                          false
                        );

                      }}
                    >
                      Add
                    </button>

                  </div>

                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default ManageCredentials;