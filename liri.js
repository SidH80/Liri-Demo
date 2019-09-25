require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
const chalk = require("chalk")

var whatToDO = process.argv[2];
var userInput = process.argv[3];

function spotifyThis(input) {

    spotify
        .search({ type: 'track', query: input, limit: 5 })
        .then(function(response) {
            console.log(JSON.stringify(response.tracks.items[0], null, 2));

            var items = response.tracks.items;
            var artist = response.items.artist;
            var album = response.items.album;

            // for (let i = 0; i < items.length; i++) {
            // }

        })
        .catch(function(err) {
            console.log(err);
        });
}

function concertThis() {
    //Retrieve and print the Name of the Venue
    //Retrieve and print the Venue Location
    //Retrieve the Date of the Event(use moment to format this as "MM/DD/YYYY")
}

function movieThis() {

    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
  function(response) {

    // * Title of the movie.
    console.log(response.data.Title);
    // * Year the movie came out.
    console.log(response.data.Year);
    // * IMDB Rating of the movie.
    console.log(response.data.imdbRating);
    // * Rotten Tomatoes Rating of the movie.
    console.log(response.data.Metascore);
    // * Country where the movie was produced.
    console.log(response.data.Country);
    // * Language of the movie.
    console.log(response.data.Language);
    // * Plot of the movie.
    console.log(response.data.Plot);
    // * Actors in the movie.
    console.log(response.data.Actors);

  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

    // retieve movie called Mr Nobody if the user leaves the movie space blank
    //display this link and print
        //"If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/"
        // "It's on Netflix!"
}

function doWhatItSays() {

    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    // Edit the text in random.txt to test out the feature for movie-this and concert-this.

}

switch(whatToDO) {
    case "spotify-this-song":
        spotifyThis(userInput);
        break;
    case "movie-this":
        movieThis();
        break;
    case "concert-this":
        concertThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}