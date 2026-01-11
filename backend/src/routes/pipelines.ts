import express from 'express';
import { z } from 'zod';
import { pgPool, redisClient } from '../lib/db';
import { authenticateToken } from '../middleware/auth';
import { validate } from '../middleware/validation';

const router = express.Router();

const pipelineSchema = z.object({
  body: z.object({
    name: z.string(),
    definition_json: z.object({}).passthrough(),
    schedule: z.string().optional(),
    org_id: z.string().uuid()
  })
});

router.use(authenticateToken);

router.get('/', async (req, res) => {
  const result = await pgPool.query('SELECT * FROM pipelines ORDER BY created_at DESC');
  res.json(result.rows);
});

router.post('/', validate(pipelineSchema), async (req, res) => {
  const { name, definition_json, schedule, org_id } = req.body;
  try {
    const result = await pgPool.query(
      'INSERT INTO pipelines (name, definition_json, schedule, org_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, definition_json, schedule, org_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create pipeline' });
  }
});

router.post('/:id/run', async (req, res) => {
  const pipelineId = req.params.id;
  
  try {
    // Create a run record
    const runResult = await pgPool.query(
      'INSERT INTO pipeline_runs (pipeline_id, status) VALUES ($1, $2) RETURNING id',
      [pipelineId, 'pending']
    );
    
    const runId = runResult.rows[0].id;
    
    // Add to Redis Queue for Python Worker
    // The worker logic in services/src/worker.py expects { runId, pipelineId }
    await redisClient.lPush('pipeline_queue', JSON.stringify({ runId, pipelineId }));
    
    res.json({ message: 'Pipeline run triggered', runId, status: 'pending' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to trigger run' });
  }
});

router.get('/:id/runs', async (req, res) => {
  const result = await pgPool.query(
    'SELECT * FROM pipeline_runs WHERE pipeline_id = $1 ORDER BY started_at DESC LIMIT 20',
    [req.params.id]
  );
  res.json(result.rows);
});

export default router;
