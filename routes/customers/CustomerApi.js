const db = require('../../db');
const express = require('express');
const router = express.Router();

// get all customer details
router.get('/customerData', async (req, res) => {
  const customerData = await db.query ("select * from customers");
  res.status(200).json({customerData})
});

// get customer data with sales numbers
router.get('/customerList', async (req, res) => {
  const customerList = await db.query ("with c as (SELECT customers.customer_id, customer_name, country, state, industry, sum(annual_target) as target from customers left join sales_target on customers.customer_id = sales_target.customer_id group by customers.customer_id order by customers.customer_id), inv as (select customer_id, sum(invoice_amount) as actual, sum(amount_received) as collected from invoices group by customer_id) select c.customer_id, c.customer_name, c.country, c.state, c.industry, c.target, inv.actual, inv.collected from c left join inv on inv.customer_id = c.customer_id");
  res.status(200).json({customerList})
});

// customer dropdown data
router.get('/', async (req, res) => {
  const customers = await db.query ("select distinct (customer_name), customer_id from customers order by customer_name");
  res.status(200).json({customers})
});

// get lead data
router.post("/leads", async (req, res) => {
  try {
    const createLead = await db.query(
      "INSERT INTO leads (customer_type, customer_id, division, assignee, prospect, region, source, status, pipeline, created_by, likelihood) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *",
      [
        req.body.customer_type,
        req.body.customer_id,
        req.body.division,
        req.body.assignee,
        req.body.prospect,
        req.body.region,
        req.body.source,
        req.body.status,
        req.body.pipeline,
        req.body.created_by,
        req.body.likelihood,
      ]
    );
    res.json({createLead});
  } catch (err) {
    console.log(err);
  }
});

// update a single lead
router.put("/editlead/:id", async (req, res) => {
  try {
    const editLead = await db.query(
      "UPDATE leads set customer_type = $1, customer_id = $2, division = $3, assignee = $4, prospect = $5, region = $6, source = $7, status = $8, pipeline = $9, created_by = $10, likelihood = $11 where lead_id = $12 returning *",
      [
        req.body.customer_type,
        req.body.customer_id,
        req.body.division,
        req.body.assignee,
        req.body.prospect,
        req.body.region,
        req.body.source,
        req.body.status,
        req.body.pipeline,
        req.body.created_by,
        req.body.likelihood,
        req.params.id,
      ]
    );
    res.json({editLead});
  } catch (err) {
    console.log(err);
  }
});

// Lead summary
router.get('/leadSummary', async (req, res) => {
  const leadSummary = await db.query ("select leads.lead_id, leads.assignee, customer_type, prospect, region, division_name, source, status, pipeline, leads.created_on, users.full_name, customers.customer_name from leads left join users on assignee = users.user_id left join customers on leads.customer_id = customers.customer_id left join divisions on division = divisions.division_id");
  res.status(200).json({leadSummary})
});

// edit lead
router.get('/editlead/:id', async (req, res) => {
  const editLead = await db.query ("select leads.*, users.full_name, customers.customer_name, divisions.division_name from leads left join users on leads.assignee = users.user_id left join customers on leads.customer_id = customers.customer_id left join divisions on leads.division = divisions.division_id where lead_id = $1", [req.params.id]);
  res.status(200).json({editLead})
});

// targets by division
router.get('/targetsByDivision', async (req, res) => {
  const targetsByDivision = await db.query ("select division_name, sum(annual_target) as div_target from sales_target left join divisions on division = division_id group by division_name order by division_name");
  res.status(200).json({targetsByDivision})
});

// targets by month
router.get('/targetsByMonth', async (req, res) => {
  const targetsByMonth = await db.query ("select sum(jan) as JAN, sum(feb) AS FEB, sum(mar) AS MAR, sum(apr) AS APR, sum(may) AS MAY, sum(jun) AS JUN, sum(jul) AS JUL, sum(aug) AS AUG, sum(sep) AS SEP, sum(oct) AS OCT, sum(nov) AS NOV, sum(dec) AS DEC from sales_target");
  res.status(200).json({targetsByMonth})
});

// targets by sales_person
router.get('/targetsByStaff', async (req, res) => {
  const targetsByStaff = await db.query ("select sales_person, full_name, sum(annual_target) as target from sales_target left join users on sales_person = user_id group by sales_person, full_name");
  res.status(200).json({targetsByStaff})
});

// targets by region
router.get('/targetsByRegion', async (req, res) => {
  const targetsByRegion = await db.query ("select country, sum(annual_target) as target from sales_target left join customers on sales_target.customer_id = customers.customer_id group by country");
  res.status(200).json({targetsByRegion})
});

// divisional targets by month
router.get('/targetsDivMonth', async (req, res) => {
  const targetsDivMonth = await db.query ("select division_name, sum(jan) as JAN, sum(feb) AS FEB, sum(mar) AS MAR, sum(apr) AS APR, sum(may) AS MAY, sum(jun) AS JUN, sum(jul) AS JUL, sum(aug) AS AUG, sum(sep) AS SEP, sum(oct) AS OCT, sum(nov) AS NOV, sum(dec) AS DEC from sales_target left join divisions on sales_target.division = divisions.division_id group by division_name");
  res.status(200).json({targetsDivMonth})
});

// divisional actual by month
router.get('/actualsDivMonth', async (req, res) => {
  const actualsDivMonth = await db.query ("select division_name, extract (month from invoice_date) as month, sum(invoice_amount) as actual from invoices left join divisions on invoices.division = divisions.division_id group by month, division_name order by division_name");
  res.status(200).json({actualsDivMonth})
});

// staff targets by month
router.get('/targetsStaffMonth', async (req, res) => {
  const targetsStaffMonth = await db.query ("select full_name, sum(jan) as JAN, sum(feb) AS FEB, sum(mar) AS MAR, sum(apr) AS APR, sum(may) AS MAY, sum(jun) AS JUN, sum(jul) AS JUL, sum(aug) AS AUG, sum(sep) AS SEP, sum(oct) AS OCT, sum(nov) AS NOV, sum(dec) AS DEC from sales_target left join users on sales_target.sales_person = users.user_id group by full_name");
  res.status(200).json({targetsStaffMonth})
});

// staff actuals by month
router.get('/actualsStaffMonth', async (req, res) => {
  const actualsStaffMonth = await db.query ("select full_name, extract (month from invoice_date) as month, sum(invoice_amount) as actual from invoices left join users on invoices.sales_person = users.user_id group by month, full_name order by full_name");
  res.status(200).json({actualsStaffMonth})
});

// region targets by month
router.get('/targetsRegionMonth', async (req, res) => {
  const targetsRegionMonth = await db.query ("select country, sum(jan) as JAN, sum(feb) AS FEB, sum(mar) AS MAR, sum(apr) AS APR, sum(may) AS MAY, sum(jun) AS JUN, sum(jul) AS JUL, sum(aug) AS AUG, sum(sep) AS SEP, sum(oct) AS OCT, sum(nov) AS NOV, sum(dec) AS DEC from sales_target left join customers on customers.customer_id = sales_target.customer_id group by country");
  res.status(200).json({targetsRegionMonth})
});

// region actuals by month
router.get('/actualsRegionMonth', async (req, res) => {
  const actualsRegionMonth = await db.query ("select country, extract (month from invoice_date) as month, sum(invoice_amount) as actual from invoices left join customers on invoices.customer_id = customers.customer_id group by month, country order by country");
  res.status(200).json({actualsRegionMonth})
});

// all targets by month
router.get('/allTargetsMonth', async (req, res) => {
  const allTargetsMonth = await db.query ("select sum(jan) as JAN, sum(feb) AS FEB, sum(mar) AS MAR, sum(apr) AS APR, sum(may) AS MAY, sum(jun) AS JUN, sum(jul) AS JUL, sum(aug) AS AUG, sum(sep) AS SEP, sum(oct) AS OCT, sum(nov) AS NOV, sum(dec) AS DEC from sales_target");
  res.status(200).json({allTargetsMonth})
});

// all targets by month
router.get('/allActualsMonth', async (req, res) => {
  const allActualsMonth = await db.query ("select extract (month from invoice_date) as month, sum(invoice_amount) as actual from invoices left join divisions on invoices.division = divisions.division_id group by month order by month");
  res.status(200).json({allActualsMonth})
});

// get sales regions
router.get('/salesRegions', async (req, res) => {
  const salesRegions = await db.query ("select * from sales_region");
  res.status(200).json({salesRegions})
});

module.exports = router;