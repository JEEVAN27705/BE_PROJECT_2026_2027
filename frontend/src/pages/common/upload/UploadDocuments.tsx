import Sidebar from '../../../components/Sidebar';
import './styles/UploadDocuments.css';

function UploadDocuments() {
  return (
    <div className="upload-documents-page">

      <Sidebar />

      <main className="upload-documents-content">

        {/* Page Header */}
        <div className="upload-documents-header">

          <span className="upload-documents-label">
            DOCUMENT MODULE
          </span>

          <h1>
            Upload Documents
          </h1>

          <p>
            Design and implement the Upload Documents page based on
            the provided Figma reference.
          </p>

        </div>


        {/* Assignment Card */}
        <section className="upload-assignment-card">

          {/* Assignment Header */}
          <div className="upload-assignment-header">

            <div className="upload-assignment-number">
              01
            </div>

            <div>
              <h2>
                Upload Documents UI Implementation
              </h2>

              <p>
                Create the Upload Documents interface according to
                the provided design reference.
              </p>
            </div>

          </div>


          {/* Design Reference */}
          <div className="upload-assignment-section">

            <h3>
              Design Reference
            </h3>

            <p>
              Use the following Figma design as the visual
              reference for the Upload Documents page.
            </p>

            <a
              href="https://www.figma.com/design/Tpu49iQu7nWDFjCr6IP9X0/BE-PROJECT-26-27?node-id=133-468&p=f"
              target="_blank"
              rel="noopener noreferrer"
              className="upload-figma-link"
            >
              Open Figma Design
              <span>↗</span>
            </a>

          </div>


          {/* Task Requirements */}
          <div className="upload-assignment-section">

            <h3>
              Task Requirements
            </h3>

            <ul>

              <li>
                Create the Upload Documents UI based on the
                provided Figma reference.
              </li>

              <li>
                Make the page responsive.
              </li>

              <li>
                Keep the existing Sidebar unchanged.
              </li>

              <li>
                Create a clean and professional document upload
                interface.
              </li>

              <li>
                Do not modify Login, App, authentication,
                or other modules.
              </li>

            </ul>

          </div>


          {/* Files You Can Modify */}
          <div className="upload-assignment-section">

            <h3>
              Files You Can Modify
            </h3>

            <div className="upload-file-list">

              <div className="upload-file-item">
                <span>📄</span>
                <code>
                  UploadDocuments.tsx
                </code>
              </div>

              <div className="upload-file-item">
                <span>🎨</span>
                <code>
                  UploadDocuments.css
                </code>
              </div>

            </div>

          </div>


          {/* Clone Repository */}
          <div className="upload-assignment-section">

            <h3>
              Clone the Repository
            </h3>

            <p>
              Clone the project repository before starting the work.
            </p>

            <div className="upload-command-box">

              <div>
                <span>1.</span>

                <code>
                  git clone https://github.com/JEEVAN27705/BE_PROJECT_2026_2027.git
                </code>
              </div>

            </div>

          </div>


          {/* Push Changes */}
          <div className="upload-assignment-section upload-push-section">

            <h3>
              How to Push the Changes
            </h3>

            <p>
              After completing the work, commit your changes and
              push them to the <strong>upload-documents</strong> branch.
            </p>

            <div className="upload-command-box">

              <div>
                <span>1.</span>

                <code>
                  git status
                </code>
              </div>

              <div>
                <span>2.</span>

                <code>
                  git add frontend/src/pages/common/UploadDocuments.tsx
                </code>
              </div>

              <div>
                <span>3.</span>

                <code>
                  git add frontend/src/pages/common/styles/UploadDocuments.css
                </code>
              </div>

              <div>
                <span>4.</span>

                <code>
                  git commit -m "feat: create upload documents UI"
                </code>
              </div>

              <div>
                <span>5.</span>

                <code>
                  git checkout -b upload-documents
                </code>
              </div>

              <div>
                <span>5.</span>

                <code>
                  git push -u origin upload-documents
                </code>
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default UploadDocuments;