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

//Function inputs a default song if user doesn't enter anything
function spotifyThis() {

  if(userInput.length == 0) {
    userInput = "The Ace";
    spotifyThisSong(userInput);
  } else {
    spotifyThisSong();
  }
}

function spotifyThisSong () {
  spotify
        .search({ type: 'track', query: userInput, limit: 20 })
        .then(function(response) {

          //States which input you are searching
          console.log(chalk.magentaBright(`Searching for ${userInput}`));
          //Logs the Artists Name
          console.log(chalk.redBright(JSON.stringify(response.tracks.items[0].artists[0].name, null, 2)));
          //Logs the Song Name
          console.log(chalk.blueBright(JSON.stringify(response.tracks.items[0].name, null, 2)));
          //Logs a spotify link to the song
          console.log(chalk.greenBright(JSON.stringify(response.tracks.items[0].album.external_urls.spotify, null, 2)));
          //logs the album name
          console.log(chalk.whiteBright(JSON.stringify(response.tracks.items[0].album.name, null, 2)));
          console.log(chalk.magenta(`-------------------------------------------------------------------`));
        })
        .catch(function(err) {
            console.log(err);
        });
}

function concertThis() {

    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(function(response) {

        var bandTown = response.data;

        console.log(`Searching for ${chalk.magentaBright(userInput)} concerts. . .`);


        //loops through the array and displays data
        for (let i = 0; i < bandTown.length; i++) {
        //logs venue name
        console.log(chalk.magenta(`Venue: ${chalk.blueBright(bandTown[i].venue.name)}`));

        //logs the venue city, contry
        console.log(chalk.magenta(`Local: ${chalk.greenBright(bandTown[i].venue.city, bandTown[i].venue.country)}`));

        //logs the date and time of the event
        console.log(chalk.magenta(`Date: ${chalk.redBright(moment(bandTown[i].datetime).format("MM/DD/YYYY"))}`));

        console.log(chalk.magenta(`-------------------------------------------------`));
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

//Function inputs a default movie if user doesn't enter anything
function movieThis() {
  if(userInput.length == 0) {
    userInput = "Mr. Nobody";
    console.log(`If you haven't watched ${userInput} then you should. It's on Netflix!`);
    movieThisMovie(userInput);
  } else {
    movieThisMovie();
  }
}

function movieThisMovie() {

    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
  function(response) {

    console.log(`Searching for the movie ${chalk.magentaBright(userInput)} . . .`);

    // * Title of the movie.
    console.log(chalk.magenta(`Title: ${chalk.yellowBright(response.data.Title)}`));
    // * Year the movie came out.
    console.log(chalk.magenta(`Year: ${chalk.redBright(response.data.Year)}`));
    // * IMDB Rating of the movie.
    console.log(chalk.magenta(`IMDB Rating: ${chalk.blueBright(response.data.imdbRating)}`));
    // * Rotten Tomatoes Rating of the movie.
    console.log(chalk.magenta(`Metascore: ${chalk.greenBright(response.data.Metascore)}`));
    // * Country where the movie was produced.
    console.log(chalk.magenta(`Country: ${chalk.yellowBright(response.data.Country)}`));
    // * Language of the movie.
    console.log(chalk.magenta(`Language: ${chalk.cyanBright(response.data.Language)}`));
    // * Plot of the movie.
    console.log(chalk.magenta(`Plot: ${chalk.whiteBright(response.data.Plot)}`));
    // * Actors in the movie.
    console.log(chalk.magenta(`Actors: ${chalk.greenBright(response.data.Actors)}`));
    console.log(chalk.magenta(`-------------------------------------------------`));

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