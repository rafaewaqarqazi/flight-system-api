const express = require('express');
const router = express.Router();
const {
  getOneWayFlights,
  getTwoWayFlights
} = require('../controllers/flight');
const upload = require('../upload');
const {requireSignin} = require('../controllers/auth');

router.get('/oneWay', getOneWayFlights)
router.get('/twoWay', getTwoWayFlights)
module.exports = router;