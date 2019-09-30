require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
const chalk = require("chalk")
var text = [];

var whatToDO = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

//Function inputs a default song if user doesn't enter anything
function spotifyThis() {

  if(userInput.length == 0) {
    userInput = "The Sign Ace of Base";
    spotifyThisSong(userInput);
  } else {
    spotifyThisSong();
  }
}

function spotifyThisSong () {
  spotify
        .search({ type: 'track', query: userInput, limit: 5 })
        .then(function(response) {

          //States which input you are searching

          var items = response.tracks.items;

          for (let i = 0; i < items.length; i++) {

          console.log(chalk.magentaBright(`Searching for song ${userInput} on Spotify . . .`),
                      //Logs the Artists Name
                      chalk.redBright(`\n${JSON.stringify(response.tracks.items[i].artists[0].name, null, 2)}`),
                      //Logs the Song Name
                      chalk.blueBright(`\n${JSON.stringify(response.tracks.items[i].name, null, 2)}`),
                      //Logs a spotify link to the song
                      chalk.greenBright(`\n${JSON.stringify(response.tracks.items[i].album.external_urls.spotify, null, 2)}`),
                      //logs the album name
                      chalk.whiteBright(`\n${JSON.stringify(response.tracks.items[i].album.name, null, 2)}`),
                      chalk.magenta(`\n-------------------------------------------------------------------`)
                      );

          text.push(response.tracks.items[i].artists[0].name, response.tracks.items[i].name, response.tracks.items[i].album.external_urls.spotify, response.tracks.items[i].album.name );

        }
        logIt();
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
        console.log(chalk.magenta(`Venue: ${chalk.blueBright(bandTown[i].venue.name)}`),
                    //logs the venue city, contry
                    chalk.magenta(`\nLocal: ${chalk.greenBright(bandTown[i].venue.city)}, ${chalk.greenBright(bandTown[i].venue.country)}`),
                    //logs the date and time of the event
                    chalk.magenta(`\nDate: ${chalk.redBright(moment(bandTown[i].datetime).format("LLL"))}`),
                    chalk.magenta(`\n-------------------------------------------------`)
                    );

        text.push(bandTown[i].venue.name, bandTown[i].venue.city, bandTown[i].venue.country, bandTown[i].datetime);

        }

        logIt();

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
    console.log(`If you haven't watched ${chalk.magentaBright(userInput)} then you should. It's on Netflix!`);
    movieThisMovie();
  } else {
    movieThisMovie();
  }
}

function movieThisMovie() {

    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
  function(response) {

    console.log(`Searching for the movie ${chalk.magentaBright(userInput)} . . .`,
                // * Title of the movie.
                chalk.magenta(`\nTitle: ${chalk.yellowBright(response.data.Title)}`),
                // * Year the movie came out.
                chalk.magenta(`\nYear: ${chalk.redBright(response.data.Year)}`),
                // * IMDB Rating of the movie.
                chalk.magenta(`\nIMDB Rating: ${chalk.blueBright(response.data.imdbRating)}`),
                // * Rotten Tomatoes Rating of the movie.
                chalk.magenta(`\nRotten Tomatoes Score: ${chalk.greenBright(response.data.Ratings[1].Value)}`),
                // * Country where the movie was produced.
                chalk.magenta(`\nCountry: ${chalk.yellowBright(response.data.Country)}`),
                // * Language of the movie.
                chalk.magenta(`\nLanguage: ${chalk.cyanBright(response.data.Language)}`),
                // * Plot of the movie.
                chalk.magenta(`\nPlot: ${chalk.whiteBright(response.data.Plot)}`),
                // * Actors in the movie.
                chalk.magenta(`\nActors: ${chalk.greenBright(response.data.Actors)}`),
                chalk.magenta(`\n-----------------------------------------------------------------------`)
                );
    text.push(response.data.Title, response.data.Year, response.data.imdbRating, response.data.Metascore, response.data.Country, response.data.Language, response.data.Plot, response.data.Actors);

    logIt();

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

//function pulls follows instructions on the random.text file
function doWhatItSays() {

  fs.readFile("random.text", "utf8", function(error, data) {

    if (error) {d
      return console.log(error);
    }

    var dataArr = data.split(", ");

    whatToDO = dataArr[0];
    userInput = dataArr[1];

    switchIt();
  })

}

function switchIt() {
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
}

function logIt() {

  fs.appendFile("log.txt", ", " + text , function(err) {

  if (err) {
      console.log(err);
  }

  else {
      console.log("Content Added!");
  }

  });
}

switchIt();