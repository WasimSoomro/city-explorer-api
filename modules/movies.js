'use strict';
const axios = require('axios');

async function moviesModularize (request, response, next){
  try {
    let keywordFromFront = request.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${keywordFromFront}`;
    
    let dataFromAxios = await axios.get(url);
    let dataToSend = dataFromAxios.data.results.map(movieObj => new Movie(movieObj));

    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.image = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`
  }
}

module.exports = moviesModularize;