# LIRI - Line Interpretation and Response Interface

A basic input/response application developed with node.js, the OMDB API, the Spotify API, and the Bands in Town API.

## Getting Started
### Node Package Installations
This program uses dotEnv to handle .env files for the Spotify API Keys/Secret (user must supply own API Key/Secret)

```javascript
npm install dotenv
```
***
Spotify API
```javascript
npm install node-spotify-api
```
***
This program uses Axios to make Bands/OMDB API Calls
```javascript
npm install axios
```
***
This program uses Moment.js to format concert dates
```javascript
npm install moment
```
***
This program uses inquirer to provide greater interactibility
```javascript
npm install inquirer
```

### .env file
After installing `dotenv` with `npm`:
* create a file name `.env`
* register for spotify API key
* Copy/Paste this code: 
```
SPOTIFY_ID=your-spotify-apikey 
SPOTIFY_SECRET=your-spotify-secret
```

## Commands
```javascript
node liri.js movie-this <movie-name>
```
Finds information about given movie

e.g. `node liri.js movie-this lord of the rings`

If no movie is given, defaults to **Mr Nobody**
***
```javascript
node liri.js concert-this <band-name>
```
Finds upcoming events involving given band

e.g. `node liri.js concert-this gin blossoms`

If no band is given, defaults to **Days'N'Daze**
***
```javascript
node liri.js spotify-this <song-name>
```
Finds information about given song

e.g. `node liri.js spotify-this your heart is a muscle the size of your fist`

If no song is given, defaults to **"All the Small Things" by blink-182**
***
```javascript
node liri.js do-what-it-says
```
Runs program with specifications listed in `random.txt`

e.g. `node liri.js do-what-it-says`
***
```javascript
node liri.js
```
Runs program with inquirer interface

e.g. `node liri.js`