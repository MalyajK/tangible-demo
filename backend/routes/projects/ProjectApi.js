const db = require('../../db');
const express = require('express');
const router = express.Router();

// get all projects
router.get('/', async (req, res) => {
  let allProjects = await db.query ("select * from projects order by project_title");
  res.status(200).json({allProjects})
});

// get projects by user
router.get('/user/:email', async (req, res) => {
  let projectsByUser = await db.query ("select project_id, project_title from projects inner join users on assignee = user_id where email = $1", [req.params.email]);
  res.status(200).json({projectsByUser})
});

// for populating main projects table
router.get('/projectsTable', async (req, res) => {
  let projectsTable = await db.query ("select projects.*, concat(first_name, ' ', last_name) as project_manager from projects left join users on assignee = user_id");
  res.status(200).json({projectsTable})
});

// get project summary by id
router.get('/projectSummary/:id', async (req, res) => {
  let projectSummary = await db.query ("select projects.*, concat(first_name, ' ', last_name) as project_manager from projects left join users on assignee = user_id where project_id = $1", [req.params.id]);
  res.status(200).json({projectSummary})
});

// get project titles
router.get('/titles', async (req, res) => {
  let titles = await db.query("select project_title from projects");
  res.status(200).json({titles})
})

// get project descriptions
router.get('/descriptions', async (req, res) => {
  let descriptions = await db.query("select project_description from projects");
  res.status(200).json({descriptions})
})

module.exports = router;