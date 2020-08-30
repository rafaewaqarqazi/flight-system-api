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
  getAllTrips,
  changeFlightStatus,
  confirmFlight
} = require("../controllers/flight");
const upload = require("../upload");
const { requireSignin } = require("../controllers/auth");

router.get("/oneWay", getOneWayFlights);
router.get("/twoWay", getTwoWayFlights);
router.get("/airline", getAirline);
router.get("/recommended", getRecommended);
router.get("/pricing", getPricing);
router.get("/user-trips/:userId", getUserTrips);
router.get("/all-trips", getAllTrips);
router.post("/book", bookFlight);
router.put("/status", changeFlightStatus);
router.post("/confirm", confirmFlight);
module.exports = router;
