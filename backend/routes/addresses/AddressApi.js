const db = require('../../db');
const express = require('express');
const router = express.Router();

// Get Employee Locations (Building-City combo)
router.get('/employeeLocations', async (req, res) => {
  let employeeLocations = await db.query ("select concat (addresses.building, ' - ', cities.city_name) as location, addresses.city_id from addresses inner join cities on addresses.city_id = cities.city_id");
  res.status(200).json({employeeLocations})
});

module.exports = router;