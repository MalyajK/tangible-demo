const projects = require('express').Router();
const queries = require('./ProjectApi');

projects.get('/titles', queries);
projects.get('/', queries)
projects.get('/descriptions', queries);
projects.get('/projectsTable', queries);
projects.get('/projectSummary/:id', queries);
projects.get('/user/:email', queries);

module.exports = projects;