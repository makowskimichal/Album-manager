const express = require('express');
const router = express.Router();
var _ = require("underscore");
var SpotifyWebApi = require('spotify-web-api-node');
const { Album } = require('../models/album');
require('dotenv').config();

const {SPOTIFY_ID, SPOTIFY_SECRET} = process.env

var spotifyApi = new SpotifyWebApi({
    clientId: SPOTIFY_ID,
    clientSecret: SPOTIFY_SECRET
});

spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
)

setInterval(() => {
  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
  
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  )
}, 1000 * 60 * 60)

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
              albumId: item.id,
              link: item.external_urls.spotify,
              artistId: item.artists[0].id,
              imageUrl: item.images[2].url,
              imageUrlBig: item.images[0].url,
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
    const albums = await Album.find({ isFavorite: true, username: req.query.user }).sort({artistName: -1});
    return res.send(albums);
  } else if(req.query.name === "artistName-ascending"){
    const albums = await Album.find({ isFavorite: true, username: req.query.user }).sort({artistName: 1});
    return res.send(albums);
  } else if(req.query.name === "albumName-ascending"){
    const albums = await Album.find({ isFavorite: true, username: req.query.user }).sort({albumName: 1});
    return res.send(albums);
  } else if(req.query.name === "albumName-descending"){
    const albums = await Album.find({ isFavorite: true, username: req.query.user }).sort({albumName: -1});
    return res.send(albums);
  } else if(req.query.name === undefined){
    const albums = await Album.find({ isFavorite: true, username: req.query.user }).sort({lastUpdated: -1});
    return res.send(albums);
  }
})

// add album to a favorites list

router.post('/favorites', async (req, res) => {
  const oldAlbum = await Album.findOne({ imageUrl: req.body.data.imageUrl, username: req.body.user } );
  if(!oldAlbum) {
    const album = new Album({
      artistName: req.body.data.artistName,
      artistId: req.body.data.artistId,
      albumId: req.body.data.albumId,
      link: req.body.data.link,
      imageUrl: req.body.data.imageUrl,
      imageUrlBig: req.body.data.imageUrlBig,
      albumName: req.body.data.albumName,
      tracksNumber: req.body.data.tracksNumber,
      releaseDate: req.body.data.releaseDate,
      isFavorite: true,
      lastUpdated: Date.now(),
      username: req.body.user
    });
    return res.send({message: `${album.albumName} has been added`, album: album.save()});
  } else if(oldAlbum.isFavorite === true) {
    return res.send({message: `You have already added ${oldAlbum.albumName} to favorites`});
  } else if (oldAlbum.isFavorite === false) {
    return res.send({message: `Album ${oldAlbum.albumName} has been edited`, album: await Album.findOneAndUpdate({ imageUrl: req.body.data.imageUrl, username: req.body.user }, { isFavorite: true, lastUpdated: Date.now()})});
  }
});

// delete from favorites list

router.post('/deleteFavorite', async(req, res) => {
  if(req.body.isBought === true || req.body.isWishlist === true) {
    return res.send(await Album.findOneAndUpdate({ imageUrl: req.body.data.imageUrl, username: req.body.user }, { isFavorite: false }));
  } else {
    return res.send(await Album.findOneAndDelete({ imageUrl: req.body.data.imageUrl, username: req.body.user }));
  }
})

// Get albums which are on a bought list

router.get('/bought', async (req, res) => {
  if(req.query.name === "artistName-descending"){
    const albums = await Album.find({ isBought: true, username: req.query.user }).sort({artistName: -1});
    return res.send(albums);
  } else if(req.query.name === "artistName-ascending"){
    const albums = await Album.find({ isBought: true, username: req.query.user }).sort({artistName: 1});
    return res.send(albums);
  } else if(req.query.name === "albumName-ascending"){
    const albums = await Album.find({ isBought: true, username: req.query.user }).sort({albumName: 1});
    return res.send(albums);
  } else if(req.query.name === "albumName-descending"){
    const albums = await Album.find({ isBought: true, username: req.query.user }).sort({albumName: -1});
    return res.send(albums);
  } else if(req.query.name === undefined){
    const albums = await Album.find({ isBought: true, username: req.query.user }).sort({lastUpdated: -1});
    return res.send(albums);
  }
})

// add album to a bought list

router.post('/bought', async (req, res) => {
  const oldAlbum = await Album.findOne({ imageUrl: req.body.data.imageUrl, username: req.body.user } );
  if(!oldAlbum) {
    const album = new Album({
      artistName: req.body.data.artistName,
      artistId: req.body.data.artistId,
      albumId: req.body.data.albumId,
      link: req.body.data.link,
      imageUrl: req.body.data.imageUrl,
      imageUrlBig: req.body.data.imageUrlBig,
      albumName: req.body.data.albumName,
      tracksNumber: req.body.data.tracksNumber,
      releaseDate: req.body.data.releaseDate,
      isBought: true,
      isWishlist: false,
      boughtMedium: req.body.data.boughtMedium,
      lastUpdated: Date.now(),
      albumBought: Date.now(),
      username: req.body.user
    });
    return res.send({message: `${album.albumName} has been added`, album: album.save()});
  } else if(oldAlbum.isBought === true && JSON.stringify(req.body.data.boughtMedium) === JSON.stringify(oldAlbum.boughtMedium)) {
    return res.send({message: `You have already purchased ${oldAlbum.albumName}`});
  } else if(oldAlbum.isBought === true && JSON.stringify(req.body.data.boughtMedium) !== JSON.stringify(oldAlbum.boughtMedium)){
    return res.send( 
      {message:`Album ${oldAlbum.albumName} has been edited`, album: await Album.findOneAndUpdate({ imageUrl: req.body.data.imageUrl, username: req.body.user }, { isBought: true, boughtMedium: req.body.data.boughtMedium, lastUpdated: Date.now()})}
      )
  } else if (oldAlbum.isBought === false) {
    return res.send( 
      {message: `Album ${oldAlbum.albumName} has been edited`, album: await Album.findOneAndUpdate({ imageUrl: req.body.data.imageUrl, username: req.body.user }, { isBought: true, boughtMedium: req.body.data.boughtMedium, lastUpdated: Date.now()})}
      )
  }
});

// delete from bought list

router.post('/deleteBought', async(req, res) => {
  if(req.body.isFavorite === true || req.body.isWishlist === true) {
    return res.send(await Album.findOneAndUpdate({ imageUrl: req.body.data.imageUrl, username: req.body.user }, { isBought: false }));
  } else {
    return res.send(await Album.findOneAndDelete({ imageUrl: req.body.data.imageUrl, username: req.body.user }));
  }
})

// Get albums which are on a wishlist

router.get('/wishlist', async (req, res) => {
  if(req.query.name === "artistName-descending"){
    const albums = await Album.find({ isWishlist: true, username: req.query.user }).sort({artistName: -1});
    return res.send(albums);
  } else if(req.query.name === "artistName-ascending"){
    const albums = await Album.find({ isWishlist: true, username: req.query.user }).sort({artistName: 1});
    return res.send(albums);
  } else if(req.query.name === "albumName-ascending"){
    const albums = await Album.find({ isWishlist: true, username: req.query.user }).sort({albumName: 1});
    return res.send(albums);
  } else if(req.query.name === "albumName-descending"){
    const albums = await Album.find({ isWishlist: true, username: req.query.user }).sort({albumName: -1});
    return res.send(albums);
  } else if(req.query.name === undefined){
    const albums = await Album.find({ isWishlist: true, username: req.query.user }).sort({lastUpdated: -1});
    return res.send(albums);
  }
})

// add album to a wishlist

router.post('/wishlist', async (req, res) => {
  const oldAlbum = await Album.findOne({ imageUrl: req.body.data.imageUrl, username: req.body.user });
  if(!oldAlbum) {
    const album = new Album({
      artistName: req.body.data.artistName,
      artistId: req.body.data.artistId,
      albumId: req.body.data.albumId,
      link: req.body.data.link,
      imageUrl: req.body.data.imageUrl,
      imageUrlBig: req.body.data.imageUrlBig,
      albumName: req.body.data.albumName,
      tracksNumber: req.body.data.tracksNumber,
      releaseDate: req.body.data.releaseDate,
      isWishlist: false,
      lastUpdated: Date.now(),
      username: req.body.user
    });
    return res.send({message: `${album.albumName} has been added`, album: album.save()});
  } else if(oldAlbum.isWishlist === true) {
    return res.send({message: `Album ${oldAlbum.albumName} is already on the wishlist`});
  } else if(oldAlbum.isBought === true) {
    return res.send({message: `You have already purchased ${oldAlbum.albumName}`});
  } else if (oldAlbum.isWishlist === false) {
    return res.send({message: `Album ${oldAlbum.albumName} has been edited`, album: await Album.findOneAndUpdate({ imageUrl: req.body.data.imageUrl, username: req.body.user }, { isWishlist: true, lastUpdated: Date.now()})});
  }
});

// delete from wishlist

router.post('/deleteWishlist', async(req, res) => {
  if(req.body.isFavorite === true || req.body.isBought === true) {
    return res.send(await Album.findOneAndUpdate({ imageUrl: req.body.data.imageUrl, username: req.body.user }, { isWishlist: false }));
  } else {
    return res.send(await Album.findOneAndDelete({ imageUrl: req.body.data.imageUrl, username: req.body.user }));
  }
})

// get recommendations based on last addded artist

router.get('/recommend', async(req, res) => {
  Album.find({ username: req.query.user }).sort({ lastUpdated: -1 }).limit(5).exec((err, album) => {
    if(err){
      res.send(err);
    } else {
      arraySeeds = album.map(each => each.artistId);
    }
    const array = [];
    spotifyApi.getRecommendations({ limit: 5, seed_artists: arraySeeds})
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
      console.log(err)
    })
  });
})


// return info about a single album

router.get('/info', async(req, res) => {
  const albumId = req.query.albumId;
  
  spotifyApi.getAlbum(`${albumId}`)
    .then(function(data) {
      const tracks = [] 
      _.each(data.body.tracks.items, (item, index) => {
        tracks.push(item.name)
      })

      return res.send({
        artistName: data.body.artists[0].name,
        albumId: data.body.id,
        link: data.body.external_urls.spotify,
        artistId: data.body.artists[0].id,
        imageUrl: data.body.images[2].url,
        imageUrlBig: data.body.images[0].url,
        albumName: data.body.name,
        tracksNumber: data.body.total_tracks,
        releaseDate: data.body.release_date,
        tracks: tracks
      });
    }, function(err) {
      console.log(err)
    });
  });

module.exports = router;