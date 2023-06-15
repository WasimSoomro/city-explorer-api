'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

let data = require('./data/data.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

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

app.get('/weather', (request, response, next) => {
  try {

    let queriedDescription = request.query.description;
    let foundDescription = data.find(city => city.description === queriedDescription);
    let descriptionToSend = new Forecast(foundDescription);
    response.status(200).send(descriptionToSend);
  } catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(cityObj){
    this.date = cityObj.valid_date;
    this.description = cityObj.weather.description;
  }
  }

app.get('*', (request, response) => {
  response.status(404).send('Sorry, page not found');
});

app.use((error, request, response, next) => {
  console.log(error.message)
  response.status(500).send(error.message)
});