const express = require("express");
const router = express.Router();
const {
  getOneWayFlights,
  getTwoWayFlights,
  getAirline,
  getRecommended,
  getPricing,
  bookFlight,
  getUserTrips,
  cancelFlight
} = require("../controllers/flight");
const upload = require("../upload");
const { requireSignin } = require("../controllers/auth");

router.get("/oneWay", getOneWayFlights);
router.get("/twoWay", getTwoWayFlights);
router.get("/airline", getAirline);
router.get("/recommended", getRecommended);
router.get("/pricing", getPricing);
router.get("/user-trips/:userId", getUserTrips);
router.post("/book", bookFlight);
router.put("/cancel", cancelFlight);
module.exports = router;
