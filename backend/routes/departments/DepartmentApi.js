const db = require('../../db');
const express = require('express');
const router = express.Router();

// Get all departments
router.get('/', async (req, res) => {
  try {
    let allDepartments = await db.query ("select * from departments");
    res.status(200).json({allDepartments})  
  } catch (error) {}
});

module.exports = router;