'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
// let data = require('./data/weather.json');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;
const weatherModularize = require('./modules/weather.js');
const moviesModularize = require('./modules/movies.js');
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

app.get('/weather', weatherModularize);
app.get('/movies', moviesModularize);

app.get('*', (request, response) => {
  response.status(404).send('Sorry, page not found');
});

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

//Part of code taken from Code Review from Jennifer Sung
//TA Help
