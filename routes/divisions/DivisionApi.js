const db = require('../../db');
const express = require('express');
const router = express.Router();

// get all invoices
router.get('/', async (req, res) => {
  const divisions = await db.query ("SELECT * from divisions");
  res.status(200).json({divisions})
});

module.exports = router;