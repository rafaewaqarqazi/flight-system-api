const { airports } = require("../helpers/airports");
const Flights = require("../models/flights");
const mongoose = require("mongoose");
const Amadeus = require("amadeus");

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

exports.getOneWayFlights = async (req, res) => {
  try {
    const { origin, destination, depart, adults, child } = req.query;
    let adultsArray = [];
    let childArray = [];
    for (let i = 0; i < adults; i++) {
      adultsArray = [
        ...adultsArray,
        {
          id: i,
          travelerType: "ADULT",
          fareOptions: ["STANDARD"]
        }
      ];
    }
    for (let i = 0; i < child; i++) {
      childArray = [
        ...childArray,
        {
          id: adults + i + 1,
          travelerType: "CHILD",
          fareOptions: ["STANDARD"]
        }
      ];
    }
    amadeus.shopping.flightOffersSearch
      .post(
        JSON.stringify({
          currencyCode: "PKR",
          originDestinations: [
            {
              id: "1",
              originLocationCode: origin,
              destinationLocationCode: destination,

              departureDateTimeRange: {
                date: depart
              }
            }
          ],
          travelers: [...adultsArray, ...childArray],
          sources: ["GDS"],
          searchCriteria: {
            maxFlightOffers: 10
          }
        })
      )
      .then(function(response) {
        res.json({ flights: response.data });
      })
      .catch(function(responseError) {
        res.json({ responseError });
      });
  } catch (e) {
    await res.json({ error: e.message });
  }
};

exports.getTwoWayFlights = async (req, res) => {
  try {
    const {
      origin,
      destination,
      depart,
      returnDate,
      adults,
      child
    } = req.query;
    let adultsArray = [];
    let childArray = [];
    for (let i = 0; i < adults; i++) {
      adultsArray = [
        ...adultsArray,
        {
          id: i,
          travelerType: "ADULT",
          fareOptions: ["STANDARD"]
        }
      ];
    }
    for (let i = 0; i < child; i++) {
      childArray = [
        ...childArray,
        {
          id: adults + i + 1,
          travelerType: "CHILD",
          fareOptions: ["STANDARD"]
        }
      ];
    }
    amadeus.shopping.flightOffersSearch
      .post(
        JSON.stringify({
          currencyCode: "PKR",
          originDestinations: [
            {
              id: "1",
              originLocationCode: origin,
              destinationLocationCode: destination,

              departureDateTimeRange: {
                date: depart
              }
            },
            {
              id: "2",
              originLocationCode: destination,
              destinationLocationCode: origin,

              departureDateTimeRange: {
                date: returnDate
              }
            }
          ],
          travelers: [...adultsArray, ...childArray],
          sources: ["GDS"],
          searchCriteria: {
            maxFlightOffers: 10
          }
        })
      )

      .then(function(response) {
        res.json({ flights: response.data });
      })
      .catch(function(responseError) {
        res.json({ responseError });
      });
  } catch (e) {
    await res.json({ error: e.message });
  }
};

exports.getAirline = async (req, res) => {
  try {
    const { airlineCodes } = req.query;
    amadeus.referenceData.airlines
      .get({
        airlineCodes
      })
      .then(function(response) {
        res.json({ airline: response.data });
      })
      .catch(function(responseError) {
        res.json({ responseError });
      });
  } catch (e) {
    await res.json({ error: e.message });
  }
};
exports.getRecommended = async (req, res) => {
  try {
    amadeus.referenceData.recommendedLocations
      .get({
        cityCodes: "ISB,LHE,KHI",
        travelerCountryCode: "FR"
      })
      .then(function(response) {
        res.json({ recommended: response.data });
      })
      .catch(function(responseError) {
        res.json({ responseError });
      });
  } catch (e) {
    await res.json({ error: e.message });
  }
};

exports.getPricing = async (req, res) => {
  try {
    amadeus.travel.analytics.AirTraffic.Traveled.get({
      originCityCode: "ISB",
      period: "2020-01"
    })
      .then(function(response) {
        res.json({ recommended: response.data });
      })
      .catch(function(responseError) {
        res.json({ responseError });
      });
  } catch (e) {
    await res.json({ error: e.message });
  }
};
exports.bookFlight = async (req, res) => {
  try {
    const { details, userId } = req.body;
    const flight = await new Flights({
      bookedBy: userId,
      bookingStatus: "Pending",
      details
    });
    const newFlight = await flight.save();
    if (newFlight) {
      await res.json({
        message: `Please collect your ticket from your airport, ticket id is "${newFlight._id}"`
      });
    } else {
      await res.status(400).json({ error: "Could not book flight" });
    }
  } catch (e) {
    await res.json({ error: e.message });
  }
};

exports.getUserTrips = async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Flights.find({
      bookedBy: mongoose.Types.ObjectId(userId)
    });

    if (trips) {
      await res.json({
        trips
      });
    } else {
      await res.status(400).json({ error: "Could not find trips" });
    }
  } catch (e) {
    await res.json({ error: e.message });
  }
};

exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Flights.find();

    if (trips) {
      await res.json({
        trips
      });
    } else {
      await res.status(400).json({ error: "Could not find trips" });
    }
  } catch (e) {
    await res.json({ error: e.message });
  }
};

exports.changeFlightStatus = async (req, res) => {
  try {
    const { flightId, status } = req.body;
    const trip = await Flights.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(flightId)
      },
      {
        bookingStatus: status
      }
    );

    if (trip) {
      await res.json({
        trip
      });
    } else {
      await res.status(400).json({ error: "Could not cancel Flight" });
    }
  } catch (e) {
    await res.json({ error: e.message });
  }
};
