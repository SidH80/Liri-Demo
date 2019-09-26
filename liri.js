require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
const chalk = require("chalk")

var whatToDO = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

function spotifyThis() {

    spotify
        .search({ type: 'track', query: userInput, limit: 5 })
        .then(function(response) {

          //States which input you are searching
          console.log(`Searching for ${userInput}`);
          //Logs the Artists Name
          console.log(JSON.stringify(response.tracks.items[0].artists[0].name, null, 2));
          //Logs the Song Name
          console.log(JSON.stringify(response.tracks.items[0].name, null, 2));
          //Logs a spotify link to the song
          console.log(JSON.stringify(response.tracks.items[0].album.external_urls.spotify, null, 2));
          //logs the album name
          console.log(JSON.stringify(response.tracks.items[0].album.name, null, 2));
        })
        .catch(function(err) {
            console.log(err);
        });
}

function concertThis() {

    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(function(response) {

        var bandTown = response.data;

        //loops through the array and displays data
        for (let i = 0; i < bandTown.length; i++) {
        //logs venue name
        console.log(`Venue: ${bandTown[i].venue.name}`);

        //logs the venue city, contry
        console.log(`Location: ${bandTown[i].venue.city}, ${bandTown[i].venue.country}`);

        //logs the date and time of the event
        console.log(`Date: ${moment(bandTown[i].datetime).format("MM/DD/YYYY")}`);
        }

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
}

function movieThis() {

    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
  function(response) {

    // * Title of the movie.
    console.log(`Title: ${response.data.Title}`);
    // * Year the movie came out.
    console.log(`Year: ${response.data.Year}`);
    // * IMDB Rating of the movie.
    console.log(`IMDB Rating: ${response.data.imdbRating}`);
    // * Rotten Tomatoes Rating of the movie.
    console.log(`Metascore: ${response.data.Metascore}`);
    // * Country where the movie was produced.
    console.log(`Country: ${response.data.Country}`);
    // * Language of the movie.
    console.log(`Language: ${response.data.Language}`);
    // * Plot of the movie.
    console.log(`Plot: ${response.data.Plot}`);
    // * Actors in the movie.
    console.log(`Actors: ${response.data.Actors}`);

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

    // retrieve movie called Mr Nobody if the user leaves the movie space blank

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
        spotifyThis();
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