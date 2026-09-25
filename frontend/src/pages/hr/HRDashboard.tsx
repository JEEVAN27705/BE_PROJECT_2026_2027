import Sidebar from '../../components/Sidebar';
import './styles/HRDashboard.css';

function HRDashboard() {
  return (
    <div className="hr-dashboard">
      <Sidebar />
      <main className="hr-dashboard-content">
        <div className="dashboard-header-custom">
          <h1>HR Dashboard</h1>
          <p>Overview of employees, retention health, and organizational knowledge continuity.</p>
        </div>

        <div className="metrics-grid">
          {/* Card 1 */}
          <div className="metric-card">
            <div className="metric-card-header">
              <span className="metric-title">TOTAL EMPLOYEES</span>
              <div className="metric-icon purple-bg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><circle cx="12" cy="10" r="2"></circle><path d="M16 20c0-2.2-2.7-4-4-4s-4 1.8-4 4"></path></svg>
              </div>
            </div>
            <div className="metric-content">
              <span className="metric-value">128</span>
              <span className="metric-badge green-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 7L13.5 15.5L8.5 10.5L2 17"></path><path d="M16 7H22V13"></path></svg>
                +4 mo
              </span>
            </div>
            <div className="metric-progress"><div className="progress-bar blue-bar" style={{width: '60%'}}></div></div>
          </div>

          {/* Card 2 */}
          <div className="metric-card">
            <div className="metric-card-header">
              <span className="metric-title">ACTIVE PROJECTS</span>
              <div className="metric-icon purple-bg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              </div>
            </div>
            <div className="metric-content">
              <span className="metric-value">12</span>
              <span className="metric-badge grey-badge">
                <span className="dot green-dot"></span> 100% staffed
              </span>
            </div>
            <div className="metric-progress"><div className="progress-bar blue-bar" style={{width: '80%'}}></div></div>
          </div>

          {/* Card 3 */}
          <div className="metric-card">
            <div className="metric-card-header">
              <span className="metric-title">TO BE DISCUSSED</span>
              <div className="metric-icon grey-bg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
            </div>
            <div className="metric-content">
              <span className="metric-value">36</span>
              <span className="metric-badge red-badge">
                8 due today
              </span>
            </div>
            <div className="metric-progress">
              <div className="progress-bar dark-bar" style={{width: '60%'}}></div>
              <div className="progress-bar red-bar" style={{width: '20%'}}></div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="metric-card">
            <div className="metric-card-header">
              <span className="metric-title">TO BE DISCUSSED</span>
              <div className="metric-icon purple-bg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
              </div>
            </div>
            <div className="metric-content">
              <span className="metric-value">248</span>
            </div>
            <div className="metric-progress"><div className="progress-bar blue-bar" style={{width: '90%'}}></div></div>
          </div>
        </div>

        {/* Main Content Area: Project Team Allocation */}
        <div className="main-content-card">
          <div className="main-content-header">
            <div className="main-icon purple-light-bg">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="2" x2="12" y2="22"></line><path d="M12 12h10"></path></svg>
            </div>
            <div>
              <h2>Project Team Allocation</h2>
              <p>Distribution of current team members across active initiatives.</p>
            </div>
          </div>

          <div className="charts-container">
            {/* Left: Bar Chart */}
            <div className="bar-chart-section">
              <div className="chart-header">
                <div className="chart-title-left">
                  <span className="chart-title">Headcount per Active Initiative</span>
                  <span className="chart-subtitle">(Total: 90 deployed)</span>
                </div>
                <div className="chart-legend">
                  <span className="dot purple-dot"></span> Active Assigned
                </div>
              </div>

              <div className="bar-chart">
                <div className="y-axis">
                  <span>25</span>
                  <span>20</span>
                  <span>15</span>
                  <span>10</span>
                  <span>5</span>
                  <span>0</span>
                </div>
                
                {/* Horizontal grid lines */}
                <div className="grid-lines">
                  <div className="grid-line" style={{bottom: '100%'}}></div>
                  <div className="grid-line" style={{bottom: '80%'}}></div>
                  <div className="grid-line" style={{bottom: '60%'}}></div>
                  <div className="grid-line" style={{bottom: '40%'}}></div>
                  <div className="grid-line" style={{bottom: '20%'}}></div>
                  <div className="grid-line" style={{bottom: '0%'}}></div>
                </div>

                <div className="chart-bars">
                  <div className="bar-group">
                    <div className="bar-value">22</div>
                    <div className="bar color-1" style={{height: `${(22/25)*100}%`}}></div>
                    <div className="bar-label">Neural Ops</div>
                  </div>
                  <div className="bar-group">
                    <div className="bar-value">18</div>
                    <div className="bar color-2" style={{height: `${(18/25)*100}%`}}></div>
                    <div className="bar-label">Alpha Core</div>
                  </div>
                  <div className="bar-group">
                    <div className="bar-value">15</div>
                    <div className="bar color-3" style={{height: `${(15/25)*100}%`}}></div>
                    <div className="bar-label">Security & Gov</div>
                  </div>
                  <div className="bar-group">
                    <div className="bar-value">14</div>
                    <div className="bar color-4" style={{height: `${(14/25)*100}%`}}></div>
                    <div className="bar-label">Data Pipeline</div>
                  </div>
                  <div className="bar-group">
                    <div className="bar-value">12</div>
                    <div className="bar color-5" style={{height: `${(12/25)*100}%`}}></div>
                    <div className="bar-label">Retention Shield</div>
                  </div>
                  <div className="bar-group">
                    <div className="bar-value">9</div>
                    <div className="bar color-6" style={{height: `${(9/25)*100}%`}}></div>
                    <div className="bar-label">Cloud Migration</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Recruitment & Staffing */}
            <div className="recruitment-section">
              <h3>RECRUITMENT & STAFFING</h3>
              
              <div className="donut-chart-container">
                <div className="donut-chart">
                  <div className="donut-hole">
                    <span className="donut-value">80%</span>
                    <span className="donut-label">FILLED</span>
                  </div>
                </div>
              </div>

              <div className="staffing-stats">
                <div className="stat-row">
                  <div className="stat-label">
                    <span className="dot blue-dot-large"></span> Hired Employees
                  </div>
                  <span className="stat-value">90</span>
                </div>
                <div className="stat-row">
                  <div className="stat-label">
                    <span className="dot orange-dot-large"></span> Open Requisitions
                  </div>
                  <span className="stat-value">22</span>
                </div>
                <div className="stat-row">
                  <div className="stat-label">
                    <span className="dot dark-dot-large"></span> Target Headcount
                  </div>
                  <span className="stat-value">112</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HRDashboard;