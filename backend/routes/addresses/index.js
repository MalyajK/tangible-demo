const addresses = require('express').Router();
const queries = require('./AddressApi');

addresses.get('/employeeLocations', queries);

module.exports = addresses;