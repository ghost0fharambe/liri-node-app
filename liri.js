/* Requires */
require('dotenv').config();
var keys = require("./keys.js");
var fs = require('fs');
// var path = require('path');
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var inquirer = require('inquirer')

/* Spotify ID constructor */
var spotify = new Spotify(keys.spotify);

/* User input variables */
var inputIndex1 = process.argv[2];
var userInput = process.argv.slice(3).join("+");

/* empty log array to be pushed to from functions */
var log = [];

/* write arguments to log */
fs.appendFileSync('log.txt', `${inputIndex1} ${userInput}`);

/* Begin movie-this command code */
if (inputIndex1 === 'movie-this') {
    if (userInput !== undefined) {
        OMDB(userInput);
    } else {
        uInput = "Mr Nobody"
        OMDB(uInput)
    };
}
/* End movie-this code */


/* Begin concert-this code */
if (inputIndex1 === 'concert-this') {
    bandsInTown(userInput);
}
/* End concert-this code */


/* Begin spotify-this code */
if (inputIndex1 === "spotify-this") {
    spotifyAPI(userInput)
}
/* End spotify-this code */

if (inputIndex1 === 'do-what-it-says') {
    doWhatSays();
}


/* Function to run OMDB api calls */
function OMDB(userInput) {
    axios.get("https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {

            /* Variable to store response.data */
            var rData = response.data;

            /* Console Logs Data */
            console.log(
                "Title: " + rData.Title + "\r\n",
                "Year Released: " + rData.Year + "\r\n",
                "IMDB Rating " + rData.imdbRating + "\r\n",
                rData.Ratings[1].Source + ":", rData.Ratings[1].Value + "\r\n", //rotten tomatoes rating
                "Country: " + rData.Country + "\r\n",
                "Language: " + rData.Language + "\r\n",
                "Plot: " + rData.Plot + "\r\n",
                "Actors: " + rData.Actors
            ); /* End Console Log */

            /* Code to write data to log */
            log.push("Movie Data: ", rData.Title, rData.Year, rData.imdbRating, rData.Ratings[1].Source, ":", rData.Ratings[1].Value, rData.Country, rData.Language, rData.Plot, rData.Actors)
            fs.appendFileSync("log.txt", log);
        });
}


/* Function to run bands in town api calls */
function bandsInTown(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=upcoming")
        .then(function (response) {
            var rData = response.data;
            console.log(response.data[0].lineup);
            for (var i = 0; i < rData.length; i++) {
                var venue = rData[i].venue.name
                var city = rData[i].venue.city
                var region = rData[i].venue.region
                var time = moment(rData.datetime).format('MM/DD/YYYY')

                console.log(`Event #${i}`);
                console.log(`Venue: ${venue}`);
                console.log(`Location: ${city}, ${region}`);
                console.log(`Date: ${time} \n`);

                log.push("Band Data: ", `event#${i}`, venue, city, region, time);
                fs.appendFileSync("log.txt", log);
            }
        })
}


/* Function to run spotify api calls */
function spotifyAPI(song) {
    spotify
        .search({
            type: 'track',
            query: '"' + song + '"',
            limit: '1'
        })
        .then(function (response) {
            var dataObject = response.tracks.items[0]
            var artist = dataObject.artists[0].name;
            var album = dataObject.album.name;
            var track = dataObject.name;
            var link = dataObject.external_urls.spotify;

            console.log("Artist: " + artist + "\n");
            console.log("Album: " + album + "\n");
            console.log("Song: " + track + "\n");
            console.log("Link: " + link + "\n");

            log.push("Spotify Data: ", artist, album, track, link)
            fs.appendFileSync("log.txt", log);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function doWhatSays() {
    var whatSays = fs.readFileSync("random.txt", "utf8").split(',');
    if (whatSays[0] === 'spotify-this') {
        spotifyAPI(whatSays[1]);
    }
}


/* Code to use with inquirer */
if (inputIndex1 === undefined) {
    inquirer
        .prompt([{
            type: 'list',
            message: 'Which program do you want to run?',
            choices: ['spotify-this', 'concert-this', 'movie-this', 'do-what-it-says'],
            name: 'program'
        }])
        .then(function (response) {
            if (response.program === 'spotify-this') {
                inquirer
                    .prompt([{
                        type: 'input',
                        message: 'Enter your song choice: ',
                        name: 'song'
                    }])
                    .then(function (response) {
                        spotifyAPI(response.song);
                    });
            } else if (response.program === 'concert-this') {
                inquirer
                    .prompt([{
                        type: 'input',
                        message: 'Enter Band name: ',
                        name: 'band'
                    }])
                    .then(function (response) {
                        bandsInTown(response.band);
                    });
            } else if (response.program === 'movie-this') {
                inquirer
                    .prompt([{
                        type: 'input',
                        message: 'Enter Movie name: ',
                        name: 'movie'
                    }])
                    .then(function (response) {
                        OMDB(response.movie);
                    });
            } else if (response.program === 'do-what-it-says') {
                doWhatSays();
            }
        });
}