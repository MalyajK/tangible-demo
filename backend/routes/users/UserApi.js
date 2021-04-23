const db = require('../../db');
const express = require('express');
const router = express.Router();

// get all users
router.get('/', async (req, res) => {
  let allUsers = await db.query ("select * from users");
  res.status(200).json({allUsers})
});

// get full names
router.get('/fullNames', async (req, res) => {
  let fullNames = await db.query ("select first_name, concat (first_name, ' ', last_name) as full_name, user_id, department_name from users inner join departments on users.department_id = departments.department_id order by full_name");
  res.status(200).json({fullNames})
});

// get only sales and marketing users
router.get('/salesMarketing', async (req, res) => {
  let salesMarketing = await db.query ("select user_id, full_name, department_name from users left join departments on users.department_id = departments.department_id where users.department_id in (5, 6)");
  res.status(200).json({salesMarketing})
});

// get only sales users
router.get('/sales', async (req, res) => {
  let sales = await db.query ("select user_id, full_name, department_name from users left join departments on users.department_id = departments.department_id where users.department_id = 6");
  res.status(200).json({sales})
});

// get user profile data
router.get('/userData/:id', async (req, res) => {
  let userData = await db.query ("select users.*, departments.department_name, addresses.building, cities.city_name from users left join departments on users.department_id = departments.department_id left join addresses on users.address_id = addresses.address_id left join cities on addresses.city_id = cities.city_id where user_id = $1", [req.params.id]);
  res.status(200).json({userData})
});

// get user ID
router.get('/userId/:email', async (req, res) => {
  let userId = await db.query ("select user_id, email from users where email = $1", [req.params.email]);
  res.status(200).json({userId})
});

// get team members
router.get('/teamMembers/:id', async (req, res) => {
  let teamMembers = await db.query ("SELECT concat (e.first_name, ' ', e.last_name) AS team_member, e.user_id, m.email FROM users e INNER JOIN users m ON m.user_id = e.manager where m.email = $1 and m.email != e.email order by team_member", [req.params.id]);
  res.status(200).json({teamMembers})
});

module.exports = router;