const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=658f1480507ad8f2e3c5ddf97e079429&query=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (response.body.error) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(
        undefined,
        "forecast: " +
          response.body.current.weather_descriptions[0] +
          ". It is currently " +
          response.body.current.temperature +
          " degrees out. It feels like " +
          response.body.current.feelslike +
          " degrees out."
      );
      // console.log(url);
    }
  });
};

module.exports = forecast;
