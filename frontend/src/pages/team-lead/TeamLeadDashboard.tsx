import Sidebar from '../../components/Sidebar';
import './styles/TeamLeadDashboard.css';

function TeamLeadDashboard() {
  return (
    <div className="teamlead-dashboard-page">

      <Sidebar />

      <main className="teamlead-dashboard-content">

        {/* Page Header */}
        <div className="teamlead-dashboard-header">

          <span className="teamlead-dashboard-label">
            TEAM LEAD MODULE
          </span>

          <h1>
            Team Lead Dashboard
          </h1>

          <p>
            Design and implement the Team Lead Dashboard page based on
            the provided Figma reference.
          </p>

        </div>


        {/* Assignment Card */}
        <section className="teamlead-assignment-card">

          {/* Assignment Header */}
          <div className="teamlead-assignment-header">

            <div className="teamlead-assignment-number">
              01
            </div>

            <div>

              <h2>
                Team Lead Dashboard UI Implementation
              </h2>

              <p>
                Create the Team Lead Dashboard interface according to
                the provided design reference.
              </p>

            </div>

          </div>


          {/* Design Reference */}
          <div className="teamlead-assignment-section">

            <h3>
              Design Reference
            </h3>

            <p>
              Use the following Figma design as the visual
              reference for the Team Lead Dashboard page.
            </p>

            <a
              href="https://www.figma.com/design/Tpu49iQu7nWDFjCr6IP9X0/BE-PROJECT-26-27?node-id=133-468&p=f"
              target="_blank"
              rel="noopener noreferrer"
              className="teamlead-figma-link"
            >
              Open Figma Design
              <span>↗</span>
            </a>

          </div>


          {/* Task Requirements */}
          <div className="teamlead-assignment-section">

            <h3>
              Task Requirements
            </h3>

            <ul>

              <li>
                Create the Team Lead Dashboard UI based on the
                provided Figma reference.
              </li>

              <li>
                Make the dashboard responsive.
              </li>

              <li>
                Keep the existing Sidebar unchanged.
              </li>

              <li>
                Create a clean and professional Team Lead
                Dashboard interface.
              </li>

              <li>
                Include the required dashboard sections,
                cards, statistics, tasks, and project information
                shown in the design.
              </li>

              <li>
                Do not modify Login, App, authentication,
                Sidebar, or other modules.
              </li>

            </ul>

          </div>


          {/* Dashboard Sections */}
          <div className="teamlead-assignment-section">

            <h3>
              Dashboard Sections
            </h3>

            <ul>

              <li>
                Team Lead Dashboard Header
              </li>

              <li>
                Team Overview / Statistics
              </li>

              <li>
                Project Progress
              </li>

              <li>
                Task Status and Task Overview
              </li>

              <li>
                Team Workload
              </li>

              <li>
                Knowledge Continuity / Documentation Coverage
              </li>

              <li>
                Recent Tasks
              </li>

              <li>
                Quick Actions
              </li>

              <li>
                AI Team Insight
              </li>

            </ul>

          </div>


          {/* Files You Can Modify */}
          <div className="teamlead-assignment-section">

            <h3>
              Files You Can Modify
            </h3>

            <div className="teamlead-file-list">

              <div className="teamlead-file-item">

                <span>
                  📄
                </span>

                <code>
                  TeamLeadDashboard.tsx
                </code>

              </div>


              <div className="teamlead-file-item">

                <span>
                  🎨
                </span>

                <code>
                  TeamLeadDashboard.css
                </code>

              </div>

            </div>

          </div>


          {/* Clone Repository */}
          <div className="teamlead-assignment-section">

            <h3>
              Clone the Repository
            </h3>

            <p>
              Clone the project repository before starting the work.
            </p>

            <div className="teamlead-command-box">

              <div>

                <span>
                  1.
                </span>

                <code>
                  git clone https://github.com/JEEVAN27705/BE_PROJECT_2026_2027.git
                </code>

              </div>

            </div>

          </div>


          {/* Push Changes */}
          <div className="teamlead-assignment-section teamlead-push-section">

            <h3>
              How to Push the Changes
            </h3>

            <p>
              After completing the work, commit your changes and
              push them to the <strong>team-lead-dashboard</strong> branch.
            </p>

            <div className="teamlead-command-box">

              <div>

                <span>
                  1.
                </span>

                <code>
                  git status
                </code>

              </div>


              <div>

                <span>
                  2.
                </span>

                <code>
                  git add frontend/src/pages/teamlead/TeamLeadDashboard.tsx
                </code>

              </div>


              <div>

                <span>
                  3.
                </span>

                <code>
                  git add frontend/src/pages/teamlead/styles/TeamLeadDashboard.css
                </code>

              </div>


              <div>

                <span>
                  4.
                </span>

                <code>
                  git commit -m "feat: create team lead dashboard UI"
                </code>

              </div>


              <div>

                <span>
                  5.
                </span>

                <code>
                  git checkout -b team-lead-dashboard
                </code>

              </div>


              <div>

                <span>
                  6.
                </span>

                <code>
                  git push -u origin team-lead-dashboard
                </code>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default TeamLeadDashboard;