//  .env file for keys on my private local storage. the require "dotenv" allows these files to be read
require("dotenv").config();
// for file storage and access
let fs = require('fs');

// load the keys
let keys= require("./keys.js");
let Twitter= require("twitter");
let Spotify=require("node-spotify-api");
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

let request= require("request");
let omdbKey=(keys.omdb.key);


// imports keys for each of these apis
let user1 = process.argv[2];
let user2 = process.argv[3];

// Starting Twitter
// sets the parameters for 10 tweets, and my username on Twitter
var params = {screen_name: 'Tinedanzer2', count: 10};
// function Tweets() {}
Tweets=  ()=>{
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) 
    {
// allows me to treat my tweets as an object, so I can print only the text data
      for (let tweet of tweets){       
    // console.log(JSON.stringify(tweet.text, null, 2));
    console.log(tweet.text);
                            };
    };
});
};
// Starting Spotify, set the property, limit, to 2 results
musicTime=(user2)=>(
    spotify.search({
     type: 'track', query: user2 , limit: 2 })
  .then((response)=> {
    console.log(response.tracks.items[0].artists[0].name);
    console.log(response.tracks.items[0].name);
    console.log(`Song Preview!: ${response.tracks.items[0].preview_url}`);
    console.log(`Album Name: ${response.tracks.items[0].album.name}`);
  })

//   ********Catches errors, and prints them in the console for the user*******
  .catch((err)=> {
    console.log("Error, Please double check your entry!");
  })
);
// Starting 'request' to pull from the OMDB API
Movie=()=>{
    request(`https://www.omdbapi.com/?t=${user2}&y=&plot=short&apikey=${omdbKey}`, function (error, response,) {
  if(error){
      console.log(error);
  };
//   using JSON.parse to convert the string received into an object, to better show and manipulate the data
let rebo=JSON.parse(response.body);
  console.log(rebo.Title);
  console.log(rebo.Year);
  console.log(rebo.imdbRating);
  console.log(rebo.Genre);
  console.log(`Main Country: ${rebo.Country[0]}${rebo.Country[1]}`);
  console.log(rebo.Language);
  console.log(rebo.Plot);
  console.log(rebo.Actors);

  var movieData = [
    "Name: " + rebo.Title,
    "Year: " + rebo.Year,
    "imdbRating: " + rebo.imdbRating,
    "Genre: " + rebo.Genre,
    "Plot: " + rebo.Plot
  ].join("\n\n");
  fs.appendFile("log.txt", movieData, function(err) {
    if (err) throw err;
    // console.log(actorData);
  });
});
}

// Starting: 'fs'
// throwing information from random.txt into the spotify api to get back data
doThings = () => 
{
    fs.readFile("random.txt", "utf8", (err, data) => {
        if (err) {
            console.log(err);
        }
        // this split method returns an ARRAY/object, which allows me to call the specific song '[1]'
        // the split happens each time a comma occurs
        // that I have preprogrammed into random.txt
        let dataArr = data.split(",");
        musicTime(dataArr[1]);

    });
};
// instead of making if/else statements, I used switch, defining my parameters with the user process.argv[] values
Commands = (user1, user2) => {
    switch (user1) {
        case "my-tweets":
            Tweets();
            break;

        case "spotify-this-song":
            if (user2 === undefined) {
                user2 = "The Sign, Ace of Base";
            };
            musicTime(user2);
            break;

        case "movie-this":
            Movie();
            break;

        case "do-what-it-says":
            doThings();
            break;};
    };
// calls the function to run the program; input a case for user1, and a song/movie for the appropriate spotify/movie-this 'case' for user2.
Commands(user1, user2)
// getTweets();
// musicTime();