'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
// let data = require('./data/weather.json');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;
const axios = require('axios');

app.listen(PORT, () => console.log(`We are running ${PORT}!`));

app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});

app.get('/hello', (request, response) => {
  let userFirstName = request.query.firstname;
  let userLastName = request.query.lastname;
  console.log(request.query);

  response.status(200).send(`Hello ${userFirstName} ${userLastName}`);
});

app.get('/weather', async (request, response, next) => {
  try {

    let lat = request.query.lat;
    let lon = request.query.lon;

    let weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

    let weatherDataFromAxios = await axios.get(weatherURL);

    let cityWeather = weatherDataFromAxios.data.data.map(cityObj => new Forecast(cityObj));

    response.status(200).send(cityWeather);

    // let searchQuery = request.query.searchQuery;
    // let foundCity = data.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
    // if (foundCity) {
    //   let weatherForecast = foundCity.data.map(date => new Forecast(date));
    //   response.status(200).send(weatherForecast);
    // } else {
    //   response.status(404).send('CANNOT BE FOUND');
    // }
  } catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(cityObj) {
    this.date = cityObj.valid_date;
    this.description = cityObj.weather.description;
    // this.temp = cityObj.temp;
    // this.precip = cityObj.precip;
  }
}

app.get('/movies', async (request, response, next) => {
  try {
    let keywordFromFront = request.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${keywordFromFront}`;

    let dataFromAxios = await axios.get(url);
    let dataToSend = dataFromAxios.data.results.map(movieObj => new Movie(movieObj));

    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
});

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.image = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Sorry, page not found');
});

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

//Part of code taken from Code Review from Jennifer Sung

