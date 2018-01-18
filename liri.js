

var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
require("dotenv").config();
var keys = require("./keys.js");

var input1 = process.argv[2];
var input2 = process.argv[3];


 var spotifyKeys = (keys.spotify);
 var twitterKeys = (keys.twitter);
 console.log(spotifyKeys)
// console.log(twitterKeys)
//Sconsole.log("keys : " + keys.twitter.consumer_key)


function calls(param1, param2){
    if(param1 === 'my-tweets'){
        myTweets();
}
   if(param1 === 'spotify-this-song'){
       spotifyThis(param2);
}

   if(param1 === 'movie-this'){
     movieThis(param2);
}

}

calls(input1,input2)


function myTweets(){




    
 
var client = new Twitter(twitterKeys)
// console.log(client);
 
var params = {screen_name: 'chrisjlan22'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    
    
    for(var i=0 ; i < tweets.length; i++){
     // console.log(tweets[i]);
     tweetDate = tweets[i].created_at
     console.log("Tweet was born on : " + tweetDate)
     console.log("Tweet Text : "  + tweets[i].text)
     console.log("\n-----------------------------------\n")

     // .toString().slice(0,24)

   
     
  
     
  
      }
    
    //console.log(response)
  }
  else{
  
  console.log(error)
  }
});
}


function spotifyThis(param2){
 // var spotify = new spotify(spotifyKeys)
  var song = param2; 
  console.log("called spot")
 
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    else{
    console.log('spotfiy is calling')
    console.log(data);
    // Do something with 'data'
    } 
});

 
}




function movieThis(param2){
  
  var movieName = param2;
 /* for (var i = 2; i < param2.length; i++) {

    if (i > 2 && i < param2.length) {
  
      movieName = movieName + "+" + param2[i];
  
    }
  
    else {
  
      movieName += param2[i];
  
    }
  }
  */
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&tomatoes=true&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
   
      var title = JSON.parse(body).Title;
      var year = JSON.parse(body).Year;
      var imdbRating = JSON.parse(body).imdbRating;
      var country = JSON.parse(body).Country;
      var language = JSON.parse(body).Language;
      var plot = JSON.parse(body).Plot;
      var Actors = JSON.parse(body).Actors;
      var rottenTomatoesRating = JSON.parse(body).tomatoRating;
    //  var rottenTomatoesRating  =(body).Ratings.Source
      console.log(" Title : " + title )
      console.log("\n Year : " + year)
      console.log("\n imdb Rating : " + imdbRating);
      console.log("\n Rotten Tomatoes Rating :" + rottenTomatoesRating);
      console.log("\n Country : " + country);
      console.log("\n langiage : " + language );
      console.log("\n Plot :" + plot);
      console.log("\n Actors : " + Actors) 
       
    }
  });

 // console.log('omdb is calling')
}




