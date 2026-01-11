export const PROJECT_STRUCTURE = `datanexus/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page definitions
│   │   ├── services/         # API clients
│   │   └── store/            # Zustand stores
│   ├── public/
│   └── package.json
├── backend/                  # Node.js API Gateway (Express)
│   ├── src/
│   │   ├── lib/              # DB & Redis clients
│   │   ├── middleware/       # Auth (JWT), Validation
│   │   ├── routes/           # API route definitions
│   │   └── server.ts         # Entry point
│   ├── package.json
│   └── Dockerfile
├── services/                 # Python Data Processing Service
├── database/                 # Database Management
├── docker/                   # Global Docker configurations
└── docs/                     # Documentation`;

export const DATABASE_SCHEMA = `-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Organizations Table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    plan VARCHAR(50) DEFAULT 'free', -- free, pro, enterprise
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Organization Members
CREATE TABLE org_members (
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL, -- owner, admin, viewer
    PRIMARY KEY (org_id, user_id)
);

-- Data Sources
CREATE TABLE data_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- s3, postgres, api, csv_upload
    config_encrypted TEXT, -- Encrypted connection string/credentials
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Datasets (Metadata for stored data)
CREATE TABLE datasets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    schema_json JSONB, -- Column definitions
    storage_path VARCHAR(512), -- S3 path or Table name
    row_count BIGINT DEFAULT 0,
    -- Spatial metadata
    is_spatial BOOLEAN DEFAULT FALSE,
    geometry_type VARCHAR(50), 
    bounds GEOMETRY(Polygon, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_datasets_org ON datasets(org_id);

-- Pipelines (ETL workflows)
CREATE TABLE pipelines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    definition_json JSONB NOT NULL, -- React Flow graph definition
    schedule VARCHAR(100), -- Cron expression
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Pipeline Runs (Execution logs)
CREATE TABLE pipeline_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_id UUID REFERENCES pipelines(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL, -- pending, processing, completed, failed
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    error_log TEXT
);
CREATE INDEX idx_pipeline_runs_pipeline ON pipeline_runs(pipeline_id);

-- Dashboards
CREATE TABLE dashboards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    definition_json JSONB, -- Layout and widget configuration
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- API Keys
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    key_hash VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    permissions JSONB, -- scopes
    last_used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security (RLS) Example
ALTER TABLE pipelines ENABLE ROW LEVEL SECURITY;

CREATE POLICY org_isolation_policy ON pipelines
    USING (org_id IN (
        SELECT org_id FROM org_members 
        WHERE user_id = current_setting('app.current_user_id')::UUID
    ));
`;

export const API_SPEC = `GET  /api/auth/register    - Register new user
POST /api/auth/login       - Login (Returns JWT + Refresh)
POST /api/auth/refresh     - Refresh access token
POST /api/auth/logout      - Logout

GET  /api/sources          - List data sources
POST /api/sources          - Create data source
GET  /api/sources/:id      - Get source details
POST /api/sources/:id/test - Test connection

GET  /api/pipelines        - List pipelines
POST /api/pipelines        - Create pipeline
POST /api/pipelines/:id/run - Trigger manual run
GET  /api/pipelines/:id/runs - Get run history

GET  /api/datasets         - List datasets
GET  /api/datasets/:id/preview - Preview data (tabular/spatial)
GET  /api/datasets/:id/query   - Execute SQL query

GET  /api/dashboards       - List dashboards
POST /api/dashboards       - Create dashboard`;