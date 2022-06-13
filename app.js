const request = require("request");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

//Print the weather information
// const url =
//   "http://api.weatherstack.com/current?access_key=658f1480507ad8f2e3c5ddf97e079429&query=37.8267,-112&units=f";

// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to weather service!");
//   } else if (response.body.error) {
//     console.log("Unable to find location");
//   } else {
//     console.log(
//       response.body.current.weather_descriptions[0] +
//         ". It is currently " +
//         response.body.current.temperature +
//         " degrees out. It feels like " +
//         response.body.current.feelslike +
//         " degrees out."
//     );
//   }
// });

// Print the lat/long for Los Angeles
// const geocodeURL =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/12what.json?access_token=pk.eyJ1IjoianVsaWVuZ3V5ZW4iLCJhIjoiY2wwbnBicXEwMWlkdzNpczU2OHFyNnltdyJ9.71h87b9Tpzevs1BUZTD_rA&limit=1";

// request({ url: geocodeURL, json: true }, (error, response) => {
//   const longitude = response.body.features[0].center[0];
//   const latitude = response.body.features[0].center[1];
//   if (error) {
//     console.log("Unable to connect to location services");
//   } else if (response.body.features[0].relevance != 1) {
//     console.log("Unable to find location");
//   } else {
//     console.log(latitude, longitude);
//   }
// });
const location = process.argv[2];

if (!location) {
  console.log("Please provide a location");
} else {
  geocode(location, (error, data) => {
    if (error) {
      return console.log(error);
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(data.location);
      console.log(forecastData);
    });
  });
}
