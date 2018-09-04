//  .env file for keys on my private local storage. the require "dotenv" allows these files to be read
require("dotenv").config();
// for file storage

// let fs = require('fs');

// load the keys
let keys= require("./keys.js");
let Twitter= require("twitter");
// let Spotify=require("node-spotify-api");
// let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
// let inquirer= require("inquirer");
let request= require("request");
// const omdbKey=(keys.omdb);

// imports keys for each of these apis
let user1 = process.argv[2];
let user2 = process.argv[3];
// sets the parameters for 10 tweets, and my username on Twitter
var params = {screen_name: 'Tinedanzer2', count: 10};
// function Tweets() {}
Tweets=  ()=>{
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) 
    {
// allows me to treat my tweets as an object, so I can print only the text data
      for (let tweet of tweets){       
    //   console.log('§§§§§§§§§§§§§§§§§§§§§§§§§');
    // console.log(JSON.stringify(tweet.text, null, 0));
    console.log(tweet.text);
                            };
    };
});
};
Commands = (user1, user2) => {
    switch (user1) {
        case "my-tweets":
            Tweets();
            break;

        case "spotify-this-song":
            if (user2 === undefined) {
                user2 = "The River";
            };
            getSong(user2);
            break;

        case "movie-this":
            Movie();
            break;

        case "do-what-it-says":
            doThings();
            break;};
    };
Commands(user1, user2)
// getTweets()