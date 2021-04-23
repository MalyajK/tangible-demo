const db = require("../../db");
const express = require("express");
const router = express.Router();

// create new event
router.post("/", async (req, res) => {
  try {
    const newEvent = await db.query(
      "INSERT into events (event_type, event_title, start_time, end_time, event_creator, invitees, is_live) values ($1, $2, $3, $4, $5, $6, $7) returning *",
      [
        req.body.event_type,
        req.body.event_title,
        req.body.start_time,
        req.body.end_time,
        req.body.event_creator,
        req.body.invitees,
        req.body.is_live,
      ]
    );
    res.status(200).json({ newEvent });
  } catch (error) {
    console.log(error);
  }
});

// get all events for a particular user
router.get("/:id", async (req, res) => {
  let allEvents = await db.query(
    "select * from events where $1 = any(invitees) order by start_time",
    [req.params.id]
  );
  res.status(200).json({ allEvents });
});

router.get("/event/:id", async (req, res) => {
  let eventById = await db.query("select * from events where event_id = $1", [
    req.params.id,
  ]);
  res.status(200).json({ eventById });
});

router.patch("/delete/:id", async (req, res) => {
  try {
    await db.query("update events set is_live = false where event_id = $1", [
      req.params.id,
    ]);
    res.status(200).json("event removed from calendar");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
