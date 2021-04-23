const users = require('express').Router();
const queries = require('./UserApi');

users.get('/', queries)
users.get('/fullNames', queries);
users.get('/userData/:id', queries);
users.get('/userId/:email', queries);
users.get('/teamMembers/:id', queries);
users.get('/salesMarketing', queries);
users.get('/sales', queries);

module.exports = users;