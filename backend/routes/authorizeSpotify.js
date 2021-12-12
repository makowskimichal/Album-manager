const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var SpotifyWebApi = require('spotify-web-api-node');

router.post("/login", (req, res) => {
    var spotifyApi = new SpotifyWebApi({
        clientId: '351a398ff7d647ac94c905995227b44e',
        clientSecret: 'b029d14c5e544baeb3e7b52a256fc1fe'
    });

    spotifyApi.clientCredentialsGrant().then(
        function(data) {
          console.log('The access token expires in ' + data.body['expires_in']);
          console.log('The access token is ' + data.body['access_token']);
      
          spotifyApi.setAccessToken(data.body['access_token']);
        },
        function(err) {
          console.log('Something went wrong when retrieving an access token');
        }
      )
})

router.post("/refresh", (req, res) => {
    var spotifyApi = new SpotifyWebApi({
        clientId: '351a398ff7d647ac94c905995227b44e',
        clientSecret: 'b029d14c5e544baeb3e7b52a256fc1fe'
    });
    
    spotifyApi.refreshAccessToken().then(
        function(data) {
          console.log('The access token has been refreshed!');
      
          // Save the access token so that it's used in future calls
          spotifyApi.setAccessToken(data.body['access_token']);
        },
        function(err) {
          console.log('Could not refresh access token', err);
        }
      );
})

module.exports = router;