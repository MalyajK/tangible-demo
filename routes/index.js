const routes = require('express').Router();
const addresses = require('./addresses');
const projects = require('./projects');
const tasks = require('./tasks');
const users = require('./users');
const departments = require('./departments');
const chats = require('./chats');
const finance = require('./finance');
const customers = require("./customers");
const divisions = require("./divisions");
const notifications = require('./notifications');
const calendar = require('./calendar');

routes.use('/projects', projects);
routes.use('/tasks', tasks);
routes.use('/users', users);
routes.use('/addresses', addresses);
routes.use('/departments', departments);
routes.use('/chats', chats);
routes.use('/finance', finance);
routes.use('/customers', customers);
routes.use('/divisions', divisions);
routes.use('/notifications', notifications)
routes.use('/calendar', calendar)

module.exports = routes;