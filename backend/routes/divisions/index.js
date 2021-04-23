const divisions = require('express').Router();
const division = require('./DivisionApi');

divisions.get('/', division);

module.exports = divisions;