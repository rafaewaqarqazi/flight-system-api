const express = require("express");
const router = express.Router();
const {
  getOneWayFlights,
  getTwoWayFlights,
  getAirline,
  getRecommended,
  getPricing,
  bookFlight
} = require("../controllers/flight");
const upload = require("../upload");
const { requireSignin } = require("../controllers/auth");

router.get("/oneWay", getOneWayFlights);
router.get("/twoWay", getTwoWayFlights);
router.get("/airline", getAirline);
router.get("/recommended", getRecommended);
router.get("/pricing", getPricing);
router.post("/book", bookFlight);
module.exports = router;
