'use strict';
const axios = require('axios');

async function weatherModularize (request, response, next){
  try {

    let lat = request.query.lat;
    let lon = request.query.lon;

    let weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

    let weatherDataFromAxios = await axios.get(weatherURL);

    let cityWeather = weatherDataFromAxios.data.data.map(cityObj => new Forecast(cityObj));

    response.status(200).send(cityWeather);

  } catch (error) {
    next(error);
  }
}

class Forecast {
  constructor(cityObj) {
    this.date = cityObj.valid_date;
    this.description = cityObj.weather.description;
    // this.temp = cityObj.temp;
    // this.precip = cityObj.precip;
  }
}


module.exports = weatherModularize;