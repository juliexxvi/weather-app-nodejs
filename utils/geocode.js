const request = require("request");

// callback function to create a reusable function
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoianVsaWVuZ3V5ZW4iLCJhIjoiY2wwbnBicXEwMWlkdzNpczU2OHFyNnltdyJ9.71h87b9Tpzevs1BUZTD_rA&limit=1`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (response.body.features[0].relevance != 1) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
