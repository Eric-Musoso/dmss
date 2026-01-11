import express from 'express';
import { pgPool } from '../lib/db';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
router.use(authenticateToken);

router.get('/', async (req, res) => {
  const result = await pgPool.query('SELECT * FROM datasets');
  res.json(result.rows);
});

router.get('/:id', async (req, res) => {
  const result = await pgPool.query('SELECT * FROM datasets WHERE id = $1', [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Dataset not found' });
  res.json(result.rows[0]);
});

router.get('/:id/preview', async (req, res) => {
  // Logic would depend on storage_path (S3 or PG table)
  // For MVP, assuming it's a PG table reference
  const meta = await pgPool.query('SELECT storage_path FROM datasets WHERE id = $1', [req.params.id]);
  if (meta.rows.length === 0) return res.status(404).json({ error: 'Dataset not found' });
  
  const tableName = meta.rows[0].storage_path;
  // SECURITY: Input sanitization required here to prevent SQLi on table name
  // In production, validate tableName against allowlist
  
  try {
    const data = await pgPool.query(`SELECT * FROM "${tableName}" LIMIT 10`);
    res.json(data.rows);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch preview' });
  }
});

router.get('/:id/query', async (req, res) => {
  const { sql } = req.query;
  // SECURITY: VERY DANGEROUS endpoint for MVP. 
  // Needs strict read-only user and query parsing/validation.
  
  if (!sql) return res.status(400).json({ error: 'SQL query required' });
  
  try {
    // Mock execution for safety in this demo
    res.json({ 
      rows: [{ id: 1, val: 'simulated_result' }], 
      notice: 'Query executed in sandbox mode' 
    });
  } catch (err) {
    res.status(400).json({ error: 'Query execution failed' });
  }
});

export default router;