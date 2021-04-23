const db = require('../../db');
const express = require('express');
const router = express.Router();

// get all notifications
router.get('/', async (req, res) => {
  let allNotifications = await db.query ("select * from notifications");
  res.status(200).json({allNotifications})
});

module.exports = router;