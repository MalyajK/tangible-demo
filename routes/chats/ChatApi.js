const db = require("../../db");
const express = require("express");
const router = express.Router();

// chat window feed
router.get("/chatWindowFeed/:id", async(req, res) => {
  try {
    const chatWindowFeed = await db.query(
      "select chats.*, msg.message, msg.created_at as message_time from chats left join (with A as (select chat_id, max(created_at) as date from messages group by chat_id), B as (select message, created_at from messages) select * from A left join B on A.date = B.created_at) as msg on chats.chat_id = msg.chat_id where creator = $1 or $1 = any(receiver) order by message_time desc",
      [req.params.id]
    );
    res.status(200).json({chatWindowFeed});
  } catch (error) {
    console.log(error)
  }
})

// message window feed
router.get("/messageWindowFeed/:id", async(req, res) => {
  try {
    const messageWindowFeed = await db.query(
      "select sender, created_at as timestamp, message from messages where chat_id = $1",
      [req.params.id]
    );
    res.status(200).json({messageWindowFeed});
  } catch (error) {
    console.log(error)
  }
})

// get clicked chat 
router.get("/selectedChat/:id", async(req, res) => {
  try {
    const selectedChat = await db.query(
      "select * from chats where chat_id = $1",
      [req.params.id]
    );
    res.status(200).json({selectedChat});
  } catch (error) {
    console.log(error)
  }
})

// get all chats by user_id
router.get("/allChats/:id", async(req, res) => {
  try {
    const allChatsByUser = await db.query(
      "select chats.* from chats left join users on chats.creator = users.user_id where creator = $1 or $1 = any(receiver) order by created_at desc",
      [req.params.id]
    );
    res.status(200).json({allChatsByUser});
  } catch (error) {
    console.log(error);
  }
})

// create new chat
router.post("/newChat", async (req, res) => {
  try {
    const newChat = await db.query(
      "INSERT into chats (is_private, creator, receiver) values ($1, $2, $3) returning *",
      [req.body.is_private, req.body.creator, req.body.receiver]
    );
    res.status(200).json({ newChat });
  } catch (error) {
    console.log(error);
  }
});

// add new message to existing chat
router.patch("/addMessage", async (req, res) => {
  try {
    const addMessage = await db.query(
      "INSERT into messages (message, sender, chat_id) values ($1, $2, $3) returning *",
      [req.body.message, req.body.sender, req.body.chat_id]
    );
    res.status(200).json({ addMessage });
  } catch (error) {
    console.log(error);
  }
});

// create new message while creating chat
router.post("/newMessage", async (req, res) => {
  try {
    const newMessage = await db.query(
      "INSERT into messages (chat_id, sender, message) values ($1, $2, $3) returning *",
      [req.body.chat_id, req.body.sender, req.body.message]
    );
    res.status(200).json({ newMessage });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
