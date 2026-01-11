# DataNexus

Unified data operations platform with ETL pipelines, orchestration, and visualization for geospatial and non-geospatial data.

## 🏗 System Architecture

DataNexus is built as a microservices-based application:

*   **Frontend**: React 18, TypeScript, Tailwind CSS, React Flow (Pipeline Builder), MapLibre GL (Geospatial).
*   **Backend (API Gateway)**: Node.js, Express, TypeScript. Handles auth, CRUD, and orchestration requests.
*   **Data Processor**: Python, FastAPI, Celery, GeoPandas. Handles heavy data lifting and geospatial operations.
*   **Database**: PostgreSQL 15 with PostGIS extension.
*   **Queue/Cache**: Redis.

## 🚀 Prerequisites

Before starting, ensure you have the following installed:

*   **Docker** and **Docker Compose** (Required)
*   **Node.js v18+** (For local development outside Docker)
*   **Python 3.10+** (For local development outside Docker)

## 🛠 Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-org/datanexus.git
cd datanexus
```

### 2. Configure Environment Variables

Create the `.env` file from the example:

```bash
cp .env.example .env
```

Review the keys in `.env`. The defaults are configured to work out-of-the-box with Docker Compose.

### 3. Start the Application

Build and start all services:

```bash
docker-compose up --build
```

Access the services:
*   **Frontend**: [http://localhost:5173](http://localhost:5173)
*   **Backend API**: [http://localhost:3001](http://localhost:3001)
*   **Processing API**: [http://localhost:8000](http://localhost:8000)

### 4. Database Initialization

The database schema is automatically applied on the first run via `database/init.sql`. 
If you need to reset the database:

```bash
docker-compose down -v
docker-compose up --build
```

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
npm install
npm test
```

### Frontend Tests
```bash
cd frontend
npm install
npm test
```

## 📦 Database Migrations

For this MVP, migrations are handled via the `database/init.sql` file which mounts to the Postgres container entrypoint. 

For production, we recommend using a migration tool like `db-migrate` or `TypeORM`.

To manually apply SQL changes:
```bash
cat new_migration.sql | docker-compose exec -T db psql -U postgres -d datanexus
```

## ☁️ Deployment Guide

### AWS Deployment (EC2/ECS)

1.  **Build Images**: Push images to ECR.
2.  **Infrastructure**: Provision RDS (Postgres+PostGIS) and ElastiCache (Redis).
3.  **Environment**: Update `.env` with production DB endpoints.
4.  **Run**: Deploy via ECS Task Definitions or `docker-compose` on EC2.

### Environment Variables for Production

Ensure these are set in your production environment:
*   `DATABASE_URL`: Full connection string to RDS.
*   `REDIS_URL`: Connection string to ElastiCache.
*   `JWT_SECRET`: Generate a strong random string.
*   `NODE_ENV`: Set to `production`.

## 📚 API Documentation

### Auth Endpoints
*   `POST /api/auth/register`: Create account
*   `POST /api/auth/login`: Get JWT token

### Pipeline Endpoints
*   `GET /api/pipelines`: List pipelines
*   `POST /api/pipelines`: Create new DAG
*   `POST /api/pipelines/:id/run`: Trigger execution

Full API specification is available in the `ArchitectureDocs` page within the application.
