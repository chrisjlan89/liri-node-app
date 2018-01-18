

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
require("dotenv").config();
var keys = require("./keys.js");

var input1 = process.argv[2];
var input2 = process.argv[3,4,5];


 var spotifyKeys = (keys.spotify);
 var twitterKeys = (keys.twitter);




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

if(param1 === 'do-what-it-says'){

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
     //tweetYear = tweets[i].created_at
     console.log("Tweet # " + (i +1) +  " was born on :  " + tweetDate.slice(0,11)) 
     
     console.log("Tweet Text : "  + tweets[i].text)
     console.log("\n-----------------------------------\n")

    

   
     
  
     
  
      }
    
    
  }
  else{
  
  console.log(error)
  }
});
}


function spotifyThis(param2){

  var song = param2; 

  if(!param2){
    song = "Ace of Base"
  }
 
 
  var spotify = new Spotify(spotifyKeys);
   
  spotify.search({ type: 'track', query: song  + '&limit=1'}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  else{
    var songInfo = data.tracks.items[0]
    var artist  = songInfo.artists[0].name
    var album =  (songInfo.album.name)

  
    console.log ("'"+ songInfo.name +  "'  by " + artist )
    console.log(" off of the album " + album )
 
 //console.log ("Song Name : " + songInfo.name)
 // console.log(songInfo.artists[0].name)
 // console.log(data.tracks.artists)


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




