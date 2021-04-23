const db = require("../../db");
const express = require("express");
const router = express.Router();

// get all tasks
router.get("/", async (req, res) => {
  const allTasks = await db.query(
    "select tasks.*, concat (users.first_name, ' ', users.last_name) as full_name, users.user_id, projects.project_id, projects.project_title from tasks left join users on assignee = users.user_id left join projects on tasks.project_id = projects.project_id"
  );
  res.status(200).json({ allTasks });
});

// get tasks by user id
router.get("/user/:email", async (req, res) => {
  const tasksByUser = await db.query(
    "select task_id, task_title from tasks inner join users on assignee = user_id where email =  $1", [req.params.email]
  );
  res.status(200).json({ tasksByUser });
});

// get a task by task id
router.get("/:id", async (req, res) => {
  try {
    const getTask = await db.query(
      "select tasks.*, concat (users.first_name, ' ', users.last_name) as full_name, users.user_id, departments.department_name, projects.project_id, projects.project_description from tasks left join users on assignee = users.user_id left join projects on tasks.project_id = projects.project_id left join departments on users.department_id = departments.department_id where task_id = $1",
      [req.params.id]
    );
    res.json(getTask);
  } catch (err) {
    console.log(err);
  }
});

// get a task by project id
router.get("/getTasksByProject/:id", async (req, res) => {
  try {
    const getTasksByProject = await db.query(
      "select tasks.*, users.user_id, concat(first_name, ' ', last_name) as full_name from tasks left join users on tasks.assignee = users.user_id where project_id = $1",
      [req.params.id]
    );
    res.status(200).json({getTasksByProject});
  } catch (err) {
    console.log(err);
  }
});

// Create new task
router.post("/", async (req, res) => {
  try {
    const createTask = await db.query(
      "INSERT INTO tasks (task_title, task_description, project_id, created_by, assignee, start_date, end_date, completion, is_public, measure_type, target) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *",
      [
        req.body.task_title,
        req.body.task_description,
        req.body.project_id,
        req.body.created_by,
        req.body.assignee,
        req.body.start_date,
        req.body.end_date,
        req.body.completion,
        req.body.is_public,
        req.body.measure_type,
        req.body.target
      ]
    );
    res.json(createTask);
  } catch (err) {
    console.log(err);
  }
});

// update a task
router.put("/:id", async (req, res) => {
  try {
    const updateTask = await db.query(
      "UPDATE tasks SET task_title = $1, task_description = $2, project_id = $3, created_by = $4, assignee = $5, start_date = $6, end_date = $7, completion = $8 where task_id = $9 returning *",
      [
        req.body.task_title,
        req.body.task_description,
        req.body.project_id,
        req.body.created_by,
        req.body.assignee,
        req.body.start_date,
        req.body.end_date,
        req.body.completion,
        req.params.id,
      ]
    );
    res.json(updateTask);
  } catch (err) {
    console.log(err);
  }
});

// weighted average of completion of tasks by project id
router.get("/wtdAvg/:id", async (req, res) => {
  try {
    const wtdAvg = await db.query("select task_id, completion*weight / (select cast(sum(weight) as decimal(4,1)) from tasks where project_id = $1) as wtd_avg from tasks where project_id = $1", [
      req.params.id,
    ]);
    res.json({wtdAvg});
  } catch (err) {
    console.log(err);
  }
});

// delete a task
router.delete("/:id", async (req, res) => {
  try {
    const deleteTask = await db.query("DELETE from tasks where task_id = $1", [
      req.params.id,
    ]);
    res.json({
      status: "Record deleted successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;