const customers = require('express').Router();
const queries = require('./CustomerApi');

customers.get('/customerList', queries);
customers.get('/', queries);
customers.get('/leadSummary', queries);
customers.get('/editlead/:id', queries);
customers.get('/customerData', queries);
customers.get('/targetsByDivision', queries);
customers.get('/targetsByMonth', queries);
customers.get('/targetsByStaff', queries);
customers.get('/targetsByRegion', queries);
customers.get('/targetsDivMonth', queries);
customers.get('/targetsStaffMonth', queries);
customers.get('/actualsDivMonth', queries);
customers.get('/actualsStaffMonth', queries);
customers.get('/targetsRegionMonth', queries);
customers.get('/actualsRegionMonth', queries);
customers.get('/allTargetsMonth', queries);
customers.get('/allActualsMonth', queries);
customers.get('/salesRegions', queries);
customers.post('/leads', queries);
customers.put('/editlead/:id', queries);

module.exports = customers;