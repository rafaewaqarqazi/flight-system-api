const {airports} = require("../helpers/airports");

const mongoose = require('mongoose')
const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});


exports.getOneWayFlights = async (req, res) => {
  try {
    const {origin, destination, depart, adults, child} = req.query
    let adultsArray = []
    let childArray = []
    for (let i = 0; i <= adults; i++) {
      adultsArray = [...adultsArray,  {
        "id": i,
        "travelerType": "ADULT",
        "fareOptions": [
          "STANDARD"
        ]
      }]
    }
    for (let i = 0; i <= child; i++) {
      childArray = [...childArray,  {
        "id": adults + i + 1,
        "travelerType": "CHILD",
        "fareOptions": [
          "STANDARD"
        ]
      }]
    }
    amadeus.shopping.flightOffersSearch.post (JSON.stringify({
      "currencyCode": "PKR",
      "originDestinations": [
        {
          "id": "1",
          "originLocationCode": origin,
          "destinationLocationCode": destination,

          "departureDateTimeRange": {
            "date": depart
          }
        }
      ],
      "travelers": [
        ...adultsArray,
        ...childArray
      ],
      "sources": [
        "GDS"
      ],
      "searchCriteria": {
        "maxFlightOffers": 10,
      }
    }))
      .then(function(response){
       res.json({ countries: response.data})
      console.log(response.data);
    }).catch(function(responseError){
      res.json({responseError})
    });

  } catch (e) {
    await res.json({error: e.message})
  }
}

exports.getTwoWayFlights = async (req, res) => {
  try {
    const {origin, destination, depart, returnDate, adults, child} = req.query
    let adultsArray = []
    let childArray = []
    for (let i = 0; i <= adults; i++) {
      adultsArray = [...adultsArray,  {
        "id": i,
        "travelerType": "ADULT",
        "fareOptions": [
          "STANDARD"
        ]
      }]
    }
    for (let i = 0; i <= child; i++) {
      childArray = [...childArray,  {
        "id": adults + i + 1,
        "travelerType": "CHILD",
        "fareOptions": [
          "STANDARD"
        ]
      }]
    }
    amadeus.shopping.flightOffersSearch.post (JSON.stringify({
      "currencyCode": "PKR",
      "originDestinations": [
        {
          "id": "1",
          "originLocationCode": origin,
          "destinationLocationCode": destination,

          "departureDateTimeRange": {
            "date": depart
          }
        },
        {
          "id": "2",
          "originLocationCode": destination,
          "destinationLocationCode": origin,

          "departureDateTimeRange": {
            "date": returnDate
          }
        }
      ],
      "travelers": [
        ...adultsArray,
        ...childArray
      ],
      "sources": [
        "GDS"
      ],
      "searchCriteria": {
        "maxFlightOffers": 10,
      }
    }))

      .then(function(response){
       res.json({ countries: response.data})
      console.log(response.data);
    }).catch(function(responseError){
      res.json({responseError})
    });

  } catch (e) {
    await res.json({error: e.message})
  }
}
