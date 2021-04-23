const notifications = require('express').Router();
const queries = require('./NotificationApi');

notifications.get('/', queries);

module.exports = notifications;