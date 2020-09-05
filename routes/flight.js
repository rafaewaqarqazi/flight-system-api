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
  confirmFlight,
  uploadEditorImage,
  createWorldTour,
  getWorldTour,
  getWorldTourPackage,
  bookWorldTour,
  deleteWorldTourPackage,
  createUmrahDeals,
  getUmrahDeals,
  getUmrahDealPackage,
  deleteUmrahDealPackage
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
router.post(
  "/world-tour/editorImage/:type",
  upload.single("upload"),
  uploadEditorImage
);
router.post("/create/world-tour/:type", upload.single("file"), createWorldTour);
router.post(
  "/create/umrah-deals/:type",
  upload.single("file"),
  createUmrahDeals
);
router.get("/world-tour", getWorldTour);
router.get("/umrah-deals", getUmrahDeals);
router.get("/world-tour/package", getWorldTourPackage);
router.get("/umrah-deals/package", getUmrahDealPackage);
router.post("/world-tour/book", bookWorldTour);
router.put("/world-tour/delete-package", deleteWorldTourPackage);
router.put("/umrah-deals/delete-package", deleteUmrahDealPackage);
module.exports = router;
