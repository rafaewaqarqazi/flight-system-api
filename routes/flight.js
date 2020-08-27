const express = require('express');
const router = express.Router();
const {
  getOneWayFlights,
  getTwoWayFlights,
  getAirline
} = require('../controllers/flight');
const upload = require('../upload');
const {requireSignin} = require('../controllers/auth');

router.get('/oneWay', getOneWayFlights)
router.get('/twoWay', getTwoWayFlights)
router.get('/airline', getAirline)
module.exports = router;