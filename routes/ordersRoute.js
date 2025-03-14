const express = require('express');
const { createOrder } = require('../controllers/ordersController');
const router = express.Router();


// Маршрути для роботи з користувачами
router.post('/create', createOrder);


module.exports = router;