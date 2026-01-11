import express from 'express';
import { z } from 'zod';
import { pgPool } from '../lib/db';
import { authenticateToken } from '../middleware/auth';
import { validate } from '../middleware/validation';

const router = express.Router();

const sourceSchema = z.object({
  body: z.object({
    name: z.string(),
    type: z.enum(['s3', 'postgres', 'api', 'csv_upload']),
    config: z.record(z.any()), // Encrypted in real app
    org_id: z.string().uuid()
  })
});

router.use(authenticateToken);

router.get('/', async (req, res) => {
  // In real app, filter by org_id from user token context
  const result = await pgPool.query('SELECT id, name, type, created_at FROM data_sources LIMIT 50');
  res.json(result.rows);
});

router.post('/', validate(sourceSchema), async (req, res) => {
  const { name, type, config, org_id } = req.body;
  const configStr = JSON.stringify(config); // Should be encrypted
  
  try {
    const result = await pgPool.query(
      'INSERT INTO data_sources (name, type, config_encrypted, org_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, type, configStr, org_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create source' });
  }
});

router.get('/:id', async (req, res) => {
  const result = await pgPool.query('SELECT * FROM data_sources WHERE id = $1', [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Source not found' });
  res.json(result.rows[0]);
});

router.post('/:id/test', async (req, res) => {
  // Mock connection testing logic
  const result = await pgPool.query('SELECT type FROM data_sources WHERE id = $1', [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Source not found' });
  
  // Simulate latency
  setTimeout(() => {
    res.json({ status: 'success', latency_ms: 45, message: 'Connection established successfully' });
  }, 500);
});

router.delete('/:id', async (req, res) => {
  await pgPool.query('DELETE FROM data_sources WHERE id = $1', [req.params.id]);
  res.status(204).send();
});

export default router;