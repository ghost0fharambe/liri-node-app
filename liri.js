/* Requires */
require('dotenv').config();
var keys = require("./keys.js");
var fs = require('fs');
var path = require('path');
var Spotify = require('node-spotify-api');
var axios = require('axios');

/* Spotify ID constructor */
var spotify = new Spotify(keys.spotify);

/* User input variables */
var inputIndex1 = process.argv[2];
var userInput = process.argv.slice(3).join("+");

console.log(userInput)


/* Begin movie-this command code */
if (inputIndex1 === 'movie-this') {
    if (userInput !== undefined) {
        OMDB(userInput);
    } else {
        uInput = "MrNobody"
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
                //rData.Ratings[1].Source + ":", rData.Ratings[1].Value + "\r\n", //rotten tomatoes rating
                "Country: " + rData.Country + "\r\n",
                "Language: " + rData.Language + "\r\n",
                "Plot: " + rData.Plot + "\r\n",
                "Actors: " + rData.Actors
            ); /* End Console Log */
        });
}


/* Function to run bands in town api calls */
function bandsInTown(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=upcoming")
        .then(function (response) {
            // console.log(JSON.stringify(response.data, null, 2));
            fs.writeFileSync(path.resolve(__dirname, './results.json'), JSON.stringify(response.data, null, 2));
            var rData = response.data;
            console.log(response.data[0].lineup);
            for (var i = 0; i < rData.length; i++) {
                console.log(rData[i].lineup);
            }
        })
}


/* Function to run spotify api calls */
function spotifyAPI(song){
    spotify
        .search({
            type: 'track',
            query: '"' + song + '"',
            limit: '1'
        })
        .then(function (response) {
            //fs.writeFileSync(path.resolve(__dirname, './results.json'), response);
            var dataObject = response.tracks.items[0]
            //console.log(JSON.stringify(response, null, 2));
            console.log(dataObject.artists[0].name)
        })
        .catch(function (err) {
            console.log(err);
        });
}