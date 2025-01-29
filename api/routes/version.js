const express = require('express');
const router = express.Router();
const packageJson = require('../../package.json');

router.get('/', (req, res) => {
  res.json({
    version: packageJson.version,
    environment: process.env.NODE_ENV || 'development'
  });
});

module.exports = router;
