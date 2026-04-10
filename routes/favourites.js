const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');

// GET /api/favourites — get current user's favourites (with property details)
router.get('/', auth, (req, res) => {
  const userId = req.user.id;

  const userFavs = db.get('favourites').filter({ userId }).value();
  const propertyIds = userFavs.map((f) => f.propertyId);

  const properties = db
    .get('properties')
    .filter((p) => propertyIds.includes(p.id))
    .value();

  res.json({ favourites: properties });
});

// POST /api/favourites/:propertyId — add to favourites
router.post('/:propertyId', auth, (req, res) => {
  const userId = req.user.id;
  const { propertyId } = req.params;

  // Verify property exists
  const property = db.get('properties').find({ id: propertyId }).value();
  if (!property) {
    return res.status(404).json({ error: 'Property not found.' });
  }

  // Check if already favourited
  const existing = db.get('favourites').find({ userId, propertyId }).value();
  if (existing) {
    return res.status(409).json({ error: 'Property already in favourites.' });
  }

  db.get('favourites')
    .push({ userId, propertyId, addedAt: new Date().toISOString() })
    .write();

  res.status(201).json({ message: 'Added to favourites.', propertyId });
});

// DELETE /api/favourites/:propertyId — remove from favourites
router.delete('/:propertyId', auth, (req, res) => {
  const userId = req.user.id;
  const { propertyId } = req.params;

  const existing = db.get('favourites').find({ userId, propertyId }).value();
  if (!existing) {
    return res.status(404).json({ error: 'Property not in your favourites.' });
  }

  db.get('favourites').remove({ userId, propertyId }).write();

  res.json({ message: 'Removed from favourites.', propertyId });
});

module.exports = router;
