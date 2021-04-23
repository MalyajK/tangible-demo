const calendar = require('express').Router();
const queries = require('./CalendarApi');

calendar.post('/', queries);
calendar.get('/:id', queries);
calendar.get('/event/:id', queries);
calendar.patch('/delete/:id', queries);

module.exports = calendar;