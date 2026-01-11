import { Pool, PoolConfig } from 'pg';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL Pool
const poolConfig: PoolConfig = process.env.DATABASE_URL 
  ? { 
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false } // Required for many cloud providers like Supabase/Heroku
    }
  : {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'datanexus',
    };

export const pgPool = new Pool({
  ...poolConfig,
  max: 20,
  idleTimeoutMillis: 30000,
});

// Redis Client
export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export const connectDB = async () => {
  try {
    await pgPool.query('SELECT NOW()');
    console.log('PostgreSQL Connected');
    await redisClient.connect();
    console.log('Redis Connected');
  } catch (err) {
    console.error('Database Connection Failed', err);
    // Don't exit process in dev mode to allow hot reload recovery
    if (process.env.NODE_ENV === 'production') {
      (process as any).exit(1);
    }
  }
};