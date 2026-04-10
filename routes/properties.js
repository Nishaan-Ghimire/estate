const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');

// GET /api/properties — list all properties (auth required)
router.get('/', auth, (req, res) => {
  const properties = db.get('properties').value();
  res.json({ properties });
});

// GET /api/properties/:id
router.get('/:id', auth, (req, res) => {
  const property = db.get('properties').find({ id: req.params.id }).value();
  if (!property) return res.status(404).json({ error: 'Property not found.' });
  res.json({ property });
});

module.exports = router;
