🧪 12. Verify Docker Installation

Before starting the project, you can verify that Docker is working correctly:

docker run hello-world

If you see:

Hello from Docker!
This message shows that your installation appears to be working correctly.

Docker is ready to use.

🐛 16. Troubleshooting
Docker daemon is not running

If you see:

failed to connect to the docker API

make sure Docker Desktop is running.

Verify:

docker version

1. Clone the Repository

Clone the project repository:

git clone <YOUR_GITHUB_REPOSITORY_URL>

Navigate into the project directory:

cd "BE PROJECT"

🔐 2. Configure Environment Variables

The project uses environment variables for configuration.

Copy the example environment file:

PowerShell
Copy-Item .env.example .env
macOS / Linux
cp .env.example .env

Open the .env file and configure the required values.

Example:

POSTGRES_DB=knowledge_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/knowledge_db

⚠️ Never commit or push .env to GitHub.

The .env file may contain passwords, API keys, tokens, and other sensitive configuration values.

🐳 3. Start the Application

From the project root directory, run:

docker compose up --build

🌐 5. Access the Application

Once all containers are running, open the following URLs.

Frontend
http://localhost:5173
Backend
http://localhost:8000
FastAPI Swagger Documentation
http://localhost:8000/docs
FastAPI ReDoc
http://localhost:8000/redoc
🛑 6. Stop the Application

To stop the running containers:

docker compose down

This stops and removes the containers and network.

The PostgreSQL data volume is preserved unless you explicitly remove it.

▶️ 7. Start the Application Again

After the initial setup, you don't need to clone the repository or reinstall dependencies every time.

Simply run:

docker compose up

If you modify:

Dockerfile
requirements.txt
package.json
package-lock.json
docker-compose.yml

rebuild the images:

docker compose up --build
🗄️ 8. Database

The project uses PostgreSQL 16.

The database runs inside its own Docker container:

knowledge-postgres

PostgreSQL is exposed locally on:

localhost:5432

Inside the Docker network, backend services should connect to PostgreSQL using the service name:

postgres

For example:

postgresql://postgres:postgres@postgres:5432/knowledge_db

Do not use localhost for the PostgreSQL hostname from inside the backend container. In Docker Compose, use the service name postgres.

🔄 9. Database Migrations

The backend uses Alembic for database migrations.

Create a migration after changing SQLAlchemy models:

docker compose exec backend alembic revision --autogenerate -m "describe your change"

Apply migrations:

docker compose exec backend alembic upgrade head

Check the current migration:

docker compose exec backend alembic current

Make sure the backend container is running before executing these commands.

📁 10. Project Structure
BE PROJECT/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── package-lock.json
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   └── services/
│   │
│   ├── alembic/
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── versions/
│   │
│   ├── alembic.ini
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .dockerignore
│
├── docker/
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md

🧩 11. Services
Service	       Technology	               Port
Frontend	React + TypeScript + Nginx	   5173
Backend	    FastAPI + Uvicorn	           8000
Database	PostgreSQL 16	               5432

Rebuild everything

If you encounter unexpected Docker build issues:

docker compose down
docker compose build --no-cache
docker compose up