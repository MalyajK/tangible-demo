const tasks = require('express').Router();
const queries = require('./TaskApi');

tasks.get('/', queries);
tasks.get('/:id', queries);
tasks.get('/getTasksByProject/:id', queries);
tasks.get('/wtdAvg/:id', queries);
tasks.get('/user/:email', queries);
tasks.post('/', queries);
tasks.put('/:id', queries);
tasks.delete('/:id', queries);


module.exports = tasks;