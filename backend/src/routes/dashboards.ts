import express from 'express';
import { pgPool } from '../lib/db';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
router.use(authenticateToken);

router.get('/', async (req, res) => {
  const result = await pgPool.query('SELECT id, name, created_at FROM dashboards');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { name, definition_json, org_id } = req.body;
  const result = await pgPool.query(
    'INSERT INTO dashboards (name, definition_json, org_id) VALUES ($1, $2, $3) RETURNING *',
    [name, definition_json, org_id]
  );
  res.status(201).json(result.rows[0]);
});

router.get('/:id', async (req, res) => {
  const result = await pgPool.query('SELECT * FROM dashboards WHERE id = $1', [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Dashboard not found' });
  res.json(result.rows[0]);
});

router.delete('/:id', async (req, res) => {
  await pgPool.query('DELETE FROM dashboards WHERE id = $1', [req.params.id]);
  res.status(204).send();
});

export default router;