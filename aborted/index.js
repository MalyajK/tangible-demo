const chat = require('express').Router();
const getToken = require('./ChatApi');
const postToken = require('./ChatApi');

chat.get('/token/:id', getToken);
chat.get('/token', postToken);

module.exports = chat;