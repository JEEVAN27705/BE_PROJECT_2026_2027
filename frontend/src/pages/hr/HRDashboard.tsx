import Sidebar from '../../components/Sidebar';
import './styles/HRDashboard.css';

function HRDashboard() {
  return (
    <div className="hr-dashboard">

      <Sidebar />

      <main className="hr-dashboard-content">

        {/* Page Header */}
        <div className="dashboard-header">
          <span className="dashboard-label">
            HR MODULE
          </span>

          <h1>HR Dashboard</h1>

          <p>
            Design and implement the HR dashboard based on the
            provided Figma reference.
          </p>
        </div>

        {/* Assignment Card */}
        <section className="assignment-card">

          {/* Assignment Header */}
          <div className="assignment-header">
            <div className="assignment-number">
              01
            </div>

            <div>
              <h2>Dashboard UI Implementation</h2>

              <p>
                Create the HR Dashboard interface according to the
                provided design reference.
              </p>
            </div>
          </div>

          {/* Design Reference */}
          <div className="assignment-section">
            <h3>Design Reference</h3>

            <p>
              Use the following Figma design as the visual
              reference for the HR Dashboard.
            </p>

            <a
              href="https://www.figma.com/design/Tpu49iQu7nWDFjCr6IP9X0/Games?node-id=133-468&p=f&t=gNaUxrmiBKLUGOYM-0"
              target="_blank"
              rel="noopener noreferrer"
              className="figma-link"
            >
              Open Figma Design
              <span>↗</span>
            </a>
          </div>

          {/* Task Requirements */}
          <div className="assignment-section">
            <h3>Task Requirements</h3>

            <ul>
              <li>
                Create the HR Dashboard UI based on the
                provided Figma reference.
              </li>

              <li>
                Make the page responsive.
              </li>

              <li>
                Keep the existing Sidebar unchanged.
              </li>

              <li>
                Do not modify Login, App, authentication,
                or other modules.
              </li>
            </ul>
          </div>

          {/* Files You Can Modify */}
          <div className="assignment-section">
            <h3>Files You Can Modify</h3>

            <div className="file-list">

              <div className="file-item">
                <span>📄</span>
                <code>HRDashboard.tsx</code>
              </div>

              <div className="file-item">
                <span>🎨</span>
                <code>HRDashboard.css</code>
              </div>

            </div>
          </div>

          {/* Clone Repository */}
          <div className="assignment-section">
            <h3>Clone the Repository</h3>

            <p>
              Clone the project repository before starting the work.
            </p>

            <div className="command-box">

              <div>
                <span>1.</span>
                <code>
                  git clone https://github.com/JEEVAN27705/BE_PROJECT_2026_2027.git
                </code>
              </div>

            </div>
          </div>

          {/* Push Changes */}
          <div className="assignment-section pr-section">

            <h3>How to Push the Changes</h3>

            <p>
              After completing the work, commit your changes and
              push them to the <strong>hr-dashboard</strong> branch.
            </p>

            <div className="command-box">

              <div>
                <span>1.</span>
                <code>
                  git status
                </code>
              </div>

              <div>
                <span>2.</span>
                <code>
                  git add frontend/src/pages/hr/HRDashboard.tsx
                </code>
              </div>

              <div>
                <span>3.</span>
                <code>
                  git add frontend/src/pages/hr/styles/HRDashboard.css
                </code>
              </div>

              <div>
                <span>4.</span>
                <code>
                  git commit -m "feat: create HR dashboard UI"
                </code>
              </div>

              <div>
                <span>5.</span>
                <code>
                  git push -u origin hr-dashboard
                </code>
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default HRDashboard;