const db = require('../../db');
const express = require('express');
const router = express.Router();

// get all invoices
router.get('/invoices', async (req, res) => {
  const invoices = await db.query ("SELECT invoices.*, customers.customer_name, divisions.division_name from invoices left join customers on invoices.customer_id = customers.customer_id left join divisions on invoices.division = divisions.division_id order by due_date");
  res.status(200).json({invoices})
});

// get invoice by id
router.get('/invoices/:id', async (req, res) => {
  const invoiceById = await db.query ("SELECT invoices.*, customers.customer_name, divisions.division_name from invoices left join customers on invoices.customer_id = customers.customer_id left join divisions on invoices.division = divisions.division_id where invoice_number = $1", [req.params.id]);
  res.status(200).json({invoiceById})
});

// update receivable
router.patch('/invoices/:id', async (req, res) => {
  const updateReceivable = await db.query ("update invoices set amount_received = amount_received + $1 where invoice_number = $2", [req.body.amount_received, req.params.id]);
  res.status(200).json({updateReceivable})
});

router.get('/invoices/actualCollect', async (req, res) => {
  const actualCollect = await db.query ("select customer_id, sum(invoice_amount) as actual, sum(amount_received) as collected from invoices group by customer_id order by customer_id");
  res.status(200).json({actualCollect})
});

// create fund requisition
router.post('/fundRequest', async (req, res) => {
  try {
    const fundRequest = await db.query ("insert into fund_requests (budgeted, project_id, description, initiator, expense_head, assign_to, task_id, frequency, amount, starting, department, required_by, status) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning *", [
      req.body.budgeted,
      req.body.project_id,
      req.body.description,
      req.body.initiator,
      req.body.expense_head,
      req.body.assign_to,
      req.body.task_id,
      req.body.frequency,
      req.body.amount,
      req.body.starting,
      req.body.department,
      req.body.required_by,
      req.body.status
    ]);
    res.json(fundRequest)
  } catch (error) {
    console.log(error);
  }
});

// get fund_request data 
router.get('/fundRequests', async (req, res) => {
  const fundRequests = await db.query ("select fund_requests.*, project_title, task_title, full_name from fund_requests left join projects on fund_requests.project_id = projects.project_id left join tasks on fund_requests.task_id = tasks.task_id left join users on initiator = users.user_id order by request_id");
  res.status(200).json({fundRequests})
});

// get fund_request data by id
router.get('/fundRequests/:id', async (req, res) => {
  const fundRequestById = await db.query ("select fund_requests.*, u1.full_name as initiator_name, u2.user_id as approver_id, u2.full_name as approver_name, project_title, task_title, department_name from fund_requests left join projects on fund_requests.project_id = projects.project_id left join tasks on fund_requests.task_id = tasks.task_id left join departments on fund_requests.department = departments.department_id left join users u1 on initiator = u1.user_id left join users u2 on u1.manager = u2.user_id where request_id = $1", [
    req.params.id
  ]);
  res.status(200).json({fundRequestById})
});

// approve or reject fund request
router.patch('/fundRequests/:id', async (req, res) => {
  const updateFundReqStatus = await db.query ("UPDATE fund_requests SET status = $1, comments = (CASE WHEN comments IS NULL THEN '[]'::JSONB ELSE comments END) || $2::JSONB WHERE request_id = $3;", [req.body.status, req.body.comments, req.params.id]);
  res.status(200).json({updateFundReqStatus})
});

module.exports = router;