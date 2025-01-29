import express from 'express';
import { readFile } from 'fs/promises';

const router = express.Router();
const packageJson = JSON.parse(
  await readFile(new URL('../../package.json', import.meta.url))
);

router.get('/', (req, res) => {
  res.json({
    version: packageJson.version,
    environment: process.env.NODE_ENV || 'development'
  });
});

export default router;
