const chats = require('express').Router();
const queries = require('./ChatApi');

chats.post('/newChat', queries);
chats.post('/newMessage', queries);
chats.get('/allChats/:id', queries);
chats.get('/chatWindowFeed/:id', queries);
chats.get('/messageWindowFeed/:id', queries);
chats.get('/selectedChat/:id', queries);
chats.patch('/addMessage', queries);

module.exports = chats;