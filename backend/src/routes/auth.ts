import express from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pgPool } from '../lib/db';
import { validate } from '../middleware/validation';

const router = express.Router();

const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

router.post('/register', validate(registerSchema), async (req, res) => {
  const { email, password, name } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pgPool.query(
      'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, hashedPassword, name]
    );
    
    // Auto-login (generate token) could happen here
    res.status(201).json({ user: result.rows[0], message: "User registered successfully" });
  } catch (error: any) {
    if (error.code === '23505') { // Unique violation
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/login', validate(loginSchema), async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pgPool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET || 'fallback_refresh',
      { expiresIn: '7d' }
    );

    res.json({ accessToken, refreshToken, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'fallback_refresh', (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { id: user.id }, 
      process.env.JWT_SECRET || 'fallback_secret', 
      { expiresIn: '15m' }
    );
    res.json({ accessToken });
  });
});

export default router;