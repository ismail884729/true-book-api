const express = require('express');
const router = express.Router();
const emailRoutes = require('./emailroutes');

// Use emailRoutes for handling /api/bookings requests
router.use('/bookings', emailRoutes);

module.exports = router;
