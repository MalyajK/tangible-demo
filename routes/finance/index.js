const finance = require('express').Router();
const queries = require('./FinanceApi');

finance.get('/invoices', queries);
finance.get('/invoices/:id', queries);
finance.patch('/invoices/:id', queries);
finance.get('/fundRequests', queries);
finance.get('/fundRequests/:id', queries);
finance.post('/fundRequest', queries);
finance.patch('/fundRequests/:id', queries);

module.exports = finance;