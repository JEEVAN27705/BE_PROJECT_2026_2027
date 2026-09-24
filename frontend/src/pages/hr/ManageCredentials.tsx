import Sidebar from '../../components/Sidebar';
import './styles/ManageCredentials.css';

function ManageCredentials() {
  return (
    <div className="manage-credentials">

      <Sidebar />

      <main className="manage-credentials-content">

        {/* Page Header */}
        <div className="credentials-header">
          <span className="credentials-label">
            HR MODULE
          </span>

          <h1>Manage Employee Credentials</h1>

          <p>
            Design and implement the Manage Employee Credentials
            interface based on the provided Figma references.
          </p>
        </div>

        {/* Assignment Card */}
        <section className="assignment-card">

          {/* Assignment Header */}
          <div className="assignment-header">

            <div className="assignment-number">
              03
            </div>

            <div>
              <h2>Manage Credentials UI Implementation</h2>

              <p>
                Create the Manage Employee Credentials interface
                according to the provided design references,
                including the popup state.
              </p>
            </div>

          </div>

          {/* Design References */}
          <div className="assignment-section">

            <h3>Design References</h3>

            <p>
              Use both Figma designs below as the visual reference
              for the Manage Employee Credentials page.
            </p>

            {/* Before Popup */}
            <div className="figma-reference">

              <div className="reference-title">
                <span className="reference-number">
                  01
                </span>

                <div>
                  <strong>Before Popup</strong>

                  <p>
                    Main Manage Employee Credentials interface
                    before opening the popup.
                  </p>
                </div>
              </div>

              <a
                href="https://www.figma.com/design/Tpu49iQu7nWDFjCr6IP9X0/BE-PROJECT-26-27?node-id=403-343&t=ppTIqdvpSfujhWTJ-0"
                target="_blank"
                rel="noopener noreferrer"
                className="figma-link"
              >
                Open Figma Design
                <span>↗</span>
              </a>

            </div>

            {/* After Popup */}
            <div className="figma-reference">

              <div className="reference-title">

                <span className="reference-number">
                  02
                </span>

                <div>
                  <strong>After Popup</strong>

                  <p>
                    Popup interface displayed after performing
                    the required action.
                  </p>
                </div>

              </div>

              <a
                href="https://www.figma.com/design/Tpu49iQu7nWDFjCr6IP9X0/BE-PROJECT-26-27?node-id=403-660&t=ppTIqdvpSfujhWTJ-0"
                target="_blank"
                rel="noopener noreferrer"
                className="figma-link"
              >
                Open Figma Design
                <span>↗</span>
              </a>

            </div>

          </div>

          {/* Task Requirements */}
          <div className="assignment-section">

            <h3>Task Requirements</h3>

            <ul>

              <li>
                Create the Manage Employee Credentials UI based
                on the provided Figma references.
              </li>

              <li>
                Implement both the main page and the popup state.
              </li>

              <li>
                Make the page responsive.
              </li>

              <li>
                Keep the existing Sidebar unchanged.
              </li>

              <li>
                Follow the layout, spacing, typography, and
                visual design shown in the Figma references.
              </li>

              <li>
                Do not modify Login, App, authentication,
                Sidebar, or other modules.
              </li>

            </ul>

          </div>

          {/* Files You Can Modify */}
          <div className="assignment-section">

            <h3>Files You Can Modify</h3>

            <div className="file-list">

              <div className="file-item">
                <span>📄</span>
                <code>ManageCredentials.tsx</code>
              </div>

              <div className="file-item">
                <span>🎨</span>
                <code>ManageCredentials.css</code>
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
              push them to the <strong>manage-credentials</strong> branch.
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
                  git add frontend/src/pages/hr/ManageCredentials.tsx
                </code>
              </div>

              <div>
                <span>3.</span>

                <code>
                  git add frontend/src/pages/hr/styles/ManageCredentials.css
                </code>
              </div>

              <div>
                <span>4.</span>
                <code>
                  git commit -m "feat: create manage credentials UI"
                </code>
              </div>

              <div>
                <span>5.</span>
                <code>
                  git push -u origin manage-credentials
                </code>
              </div>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

export default ManageCredentials;