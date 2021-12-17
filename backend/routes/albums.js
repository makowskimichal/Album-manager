const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var _ = require("underscore");
const { Album } = require('../models/album');

var SpotifyWebApi = require('spotify-web-api-node');

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

  // Search albums by anything related to it

  router.get('/search', async (req, res) => {
    let name = req.query.name;
    let array = [];
    spotifyApi.searchAlbums(name, { limit: 5 }).then(
      function(data){
        _.each(data.body.albums.items, (item, index) => {
          array.push(
            new Album({
              artistName: item.artists[0].name,
              artistId: item.artists[0].id,
              imageUrl: item.images[2].url,
              albumName: item.name,
              tracksNumber: item.total_tracks,
              releaseDate: item.release_date
              })
          )
        });
      return res.send(array);
      }, function(err) {
        return res.status(404).send(err);
      }
    )
  })

// Get albums which are on a favorites list

router.get('/favorites', async (req, res) => {
  if(req.query.name === "artistName-descending"){
    const albums = await Album.find({ isFavorite: true }).sort({artistName: -1});
    return res.send(albums);
  } else if(req.query.name === "artistName-ascending"){
    const albums = await Album.find({ isFavorite: true }).sort({artistName: 1});
    return res.send(albums);
  } else if(req.query.name === "albumName-ascending"){
    const albums = await Album.find({ isFavorite: true }).sort({albumName: 1});
    return res.send(albums);
  } else if(req.query.name === "albumName-descending"){
    const albums = await Album.find({ isFavorite: true }).sort({albumName: -1});
    return res.send(albums);
  } else if(req.query.name === undefined){
    const albums = await Album.find({ isFavorite: true }).sort({lastUpdated: -1});
    return res.send(albums);
  }
})

// add album to a favorites list

router.post('/favorites', async (req, res) => {
  const oldAlbum = await Album.findOne({ imageUrl: req.body.imageUrl } );
  if(!oldAlbum) {
    const album = new Album({
      artistName: req.body.artistName,
      artistId: req.body.artistId,
      imageUrl: req.body.imageUrl,
      albumName: req.body.albumName,
      tracksNumber: req.body.tracksNumber,
      releaseDate: req.body.releaseDate,
      isFavorite: true,
      lastUpdated: Date.now()
    });
    console.log("nowy dodany")
    return res.send({message: "New album has been added", album: album.save()});
  } else if(oldAlbum.isFavorite === true) {
    return res.send({message: "Album is already on the favorites list"});
  } else if (oldAlbum.isFavorite === false) {
    console.log("zmieniony")
    return res.send({message: "Album has been edited", album: await Album.findOneAndUpdate({ imageUrl: req.body.imageUrl }, { isFavorite: true, lastUpdated: Date.now() })});
  }
});

// delete from favorites list

router.post('/deleteFavorite', async(req, res) => {
  console.log(req.body.isBought);
  if(req.body.isBought === true) {
    return res.send(await Album.findOneAndUpdate({ imageUrl: req.body.imageUrl }, { isFavorite: false }));
  } else {
    return res.send(await Album.findOneAndDelete({ imageUrl: req.body.imageUrl }));
  }
})

// Get albums which are on a bought list

router.get('/bought', async (req, res) => {
  if(req.query.name === "artistName-descending"){
    const albums = await Album.find({ isBought: true }).sort({artistName: -1});
    return res.send(albums);
  } else if(req.query.name === "artistName-ascending"){
    const albums = await Album.find({ isBought: true }).sort({artistName: 1});
    return res.send(albums);
  } else if(req.query.name === "albumName-ascending"){
    const albums = await Album.find({ isBought: true }).sort({albumName: 1});
    return res.send(albums);
  } else if(req.query.name === "albumName-descending"){
    const albums = await Album.find({ isBought: true }).sort({albumName: -1});
    return res.send(albums);
  } else if(req.query.name === undefined){
    const albums = await Album.find({ isBought: true }).sort({lastUpdated: -1});
    return res.send(albums);
  }
})

// add album to a bought list

router.post('/bought', async (req, res) => {
  const oldAlbum = await Album.findOne({ imageUrl: req.body.imageUrl } );
  if(!oldAlbum) {
    const album = new Album({
      artistName: req.body.artistName,
      artistId: req.body.artistId,
      imageUrl: req.body.imageUrl,
      albumName: req.body.albumName,
      tracksNumber: req.body.tracksNumber,
      releaseDate: req.body.releaseDate,
      isBought: true,
      boughtMedium: req.body.boughtMedium,
      lastUpdated: Date.now()
    });
    return res.send({message: "New album has been added", album: album.save()});
  } else if(oldAlbum.isBought === true) {
    return res.send({message: "Album is already on the bought list"});
  } else if (oldAlbum.isBought === false) {
    return res.send( 
      {message: "Album has been edited", album: await Album.findOneAndUpdate({ imageUrl: req.body.imageUrl }, { isBought: true, boughtMedium: req.body.boughtMedium, lastUpdated: Date.now()})}
      )
  }
});

// delete from bought list

router.post('/deleteBought', async(req, res) => {
  if(req.body.isFavorite === true) {
    return res.send(await Album.findOneAndUpdate({ imageUrl: req.body.imageUrl }, { isBought: false }));
  } else {
    return res.send(await Album.findOneAndDelete({ imageUrl: req.body.imageUrl }));
  }
})

// Get albums which are on a planned list

router.get('/planned', async (req, res) => {
  const albums = await Album.find({ isPlanned: true }).sort('name');
  return res.send(albums);
})

// get recommendations based on last addded artist

router.get('/recommend', async(req, res) => {
  Album.find().sort({ lastUpdated: -1 }).limit(5).exec((err, album) => {
    if(err){
      res.send(err);
    } else {
      arraySeeds = album.map(each => each.artistId);
    }
    const array = [];
    spotifyApi.getRecommendations({ limit: 10, seed_artists: arraySeeds})
    .then(function(data){
      _.each(data.body.tracks, (item, index) => {
        array.push(
          new Album({
            artistName: item.album.artists[0].name,
            artistId: item.album.artists[0].id,
            imageUrl: item.album.images[2].url,
            albumName: item.album.name,
            tracksNumber: item.album.total_tracks,
            releaseDate: item.album.release_date
            })
        )
      });
      return res.send(array);
    }, function(err) {
      console.log("err")
    })
  });

})

// delete album from all the lists

router.post('/delete', async(req, res) => {
  return res.send(await Album.findOneAndDelete({ imageUrl: req.body.imageUrl }));
})


module.exports = router;