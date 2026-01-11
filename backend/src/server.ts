import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDB } from './lib/db';

// Routes
import authRoutes from './routes/auth';
import sourceRoutes from './routes/sources';
import pipelineRoutes from './routes/pipelines';
import datasetRoutes from './routes/datasets';
import dashboardRoutes from './routes/dashboards';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Database
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes Setup
app.use('/api/auth', authRoutes);
app.use('/api/sources', sourceRoutes);
app.use('/api/pipelines', pipelineRoutes);
app.use('/api/datasets', datasetRoutes);
app.use('/api/dashboards', dashboardRoutes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});