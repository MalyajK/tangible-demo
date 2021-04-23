const departments = require('express').Router();
const queries = require('./DepartmentApi');

departments.get('/', queries);

module.exports = departments;