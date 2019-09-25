require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var whatToDO = process.argv[2];
var userInput = process.argv[3];

function spotifyThis(input) {

    spotify
        .search({ type: 'track', query: input, limit: 20 })
        .then(function(response) {
            console.log(JSON.stringify(response.tracks.items[0], null, 2));
        })
        .catch(function(err) {
            console.log(err);
        });
}

function concertThis() {

}

function movieThis() {

}

function doWhatItSays() {

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