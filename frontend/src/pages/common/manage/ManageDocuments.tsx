import Sidebar from '../../../components/Sidebar';
import './styles/ManageDocuments.css';

function ManageDocuments() {
  return (
    <div className="manage-documents-page">

      <Sidebar />

      <main className="manage-documents-content">

        {/* Page Header */}
        <div className="manage-documents-header">

          <span className="manage-documents-label">
            DOCUMENT MODULE
          </span>

          <h1>
            Manage Documents
          </h1>

          <p>
            Design and implement the Manage Documents page based on
            the provided Figma reference.
          </p>

        </div>


        {/* Assignment Card */}
        <section className="manage-assignment-card">

          {/* Assignment Header */}
          <div className="manage-assignment-header">

            <div className="manage-assignment-number">
              01
            </div>

            <div>

              <h2>
                Manage Documents UI Implementation
              </h2>

              <p>
                Create the Manage Documents interface according to
                the provided design reference.
              </p>

            </div>

          </div>


          {/* Design Reference */}
          <div className="manage-assignment-section">

            <h3>
              Design Reference
            </h3>

            <p>
              Use the following Figma design as the visual
              reference for the Manage Documents page.
            </p>

            <a
              href="https://www.figma.com/design/Tpu49iQu7nWDFjCr6IP9X0/BE-PROJECT-26-27?node-id=133-468&p=f"
              target="_blank"
              rel="noopener noreferrer"
              className="manage-figma-link"
            >
              Open Figma Design
              <span>↗</span>
            </a>

          </div>


          {/* Task Requirements */}
          <div className="manage-assignment-section">

            <h3>
              Task Requirements
            </h3>

            <ul>

              <li>
                Create the Manage Documents UI based on the
                provided Figma reference.
              </li>

              <li>
                Make the page responsive.
              </li>

              <li>
                Keep the existing Sidebar unchanged.
              </li>

              <li>
                Create a clean and professional document
                management interface.
              </li>

              <li>
                Allow users to view and manage uploaded documents.
              </li>

              <li>
                Do not modify Login, App, authentication,
                or other modules.
              </li>

            </ul>

          </div>


          {/* Document Management Preview */}
          <div className="manage-assignment-section">

            <h3>
              Document Management
            </h3>

            <p>
              The final page should provide a clear interface for
              viewing and managing project documents.
            </p>


            <div className="manage-document-preview">

              <div className="manage-document-row">

                <div className="manage-document-info">

                  <div className="manage-document-icon">
                    📄
                  </div>

                  <div>
                    <div className="manage-document-name">
                      Project Documentation.pdf
                    </div>

                    <div className="manage-document-meta">
                      PDF • Project Documents
                    </div>
                  </div>

                </div>

                <span className="manage-document-status">
                  Available
                </span>

              </div>


              <div className="manage-document-row">

                <div className="manage-document-info">

                  <div className="manage-document-icon">
                    📄
                  </div>

                  <div>
                    <div className="manage-document-name">
                      Technical Specification.docx
                    </div>

                    <div className="manage-document-meta">
                      DOCX • Technical Documents
                    </div>
                  </div>

                </div>

                <span className="manage-document-status">
                  Available
                </span>

              </div>


              <div className="manage-document-row">

                <div className="manage-document-info">

                  <div className="manage-document-icon">
                    📄
                  </div>

                  <div>
                    <div className="manage-document-name">
                      Project Requirements.pdf
                    </div>

                    <div className="manage-document-meta">
                      PDF • Requirements
                    </div>
                  </div>

                </div>

                <span className="manage-document-status">
                  Available
                </span>

              </div>

            </div>

          </div>


          {/* Files You Can Modify */}
          <div className="manage-assignment-section">

            <h3>
              Files You Can Modify
            </h3>

            <div className="manage-file-list">

              <div className="manage-file-item">
                <span>📄</span>

                <code>
                  ManageDocuments.tsx
                </code>
              </div>

              <div className="manage-file-item">
                <span>🎨</span>

                <code>
                  ManageDocuments.css
                </code>
              </div>

            </div>

          </div>


          {/* Clone Repository */}
          <div className="manage-assignment-section">

            <h3>
              Clone the Repository
            </h3>

            <p>
              Clone the project repository before starting the work.
            </p>

            <div className="manage-command-box">

              <div>

                <span>1.</span>

                <code>
                  git clone https://github.com/JEEVAN27705/BE_PROJECT_2026_2027.git
                </code>

              </div>

            </div>

          </div>


          {/* Push Changes */}
          <div className="manage-assignment-section manage-push-section">

            <h3>
              How to Push the Changes
            </h3>

            <p>
              After completing the work, commit your changes and
              push them to the <strong>manage-documents</strong> branch.
            </p>

            <div className="manage-command-box">

              <div>
                <span>1.</span>

                <code>
                  git status
                </code>
              </div>

              <div>
                <span>2.</span>

                <code>
                  git add frontend/src/pages/common/manage/ManageDocuments.tsx
                </code>
              </div>

              <div>
                <span>3.</span>

                <code>
                  git add frontend/src/pages/common/manage/styles/ManageDocuments.css
                </code>
              </div>

              <div>
                <span>4.</span>

                <code>
                  git commit -m "feat: create manage documents UI"
                </code>
              </div>

              <div>
                <span>5.</span>

                <code>
                  git checkout -b manage-documents
                </code>
              </div>

              <div>
                <span>6.</span>

                <code>
                  git push -u origin manage-documents
                </code>
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default ManageDocuments;