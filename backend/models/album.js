const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    artistName: {
        type: String,
        minlength: 1,
        maxlength: 250,
        required: true
    },
    artistId: {
        type: String,
        minlength: 1,
        maxlength: 250,
        required: true 
    },
    albumId: {
        type: String,
        minlength: 1,
        maxlength: 250,
        required: true 
    } ,
    link:  {
        type: String,
        minlength: 1,
        maxlength: 250,
        required: true 
    },
    imageUrl: {
        type: String,
        minlength: 1,
        maxlength: 250,
        required: true
    },
    imageUrlBig: {
        type: String,
        minlength: 1,
        maxlength: 250,
        required: true
    },
    albumName: {
        type: String,
        minlength: 1,
        maxlength: 250,
        required: true
    },
    tracksNumber: {
        type: Number,
        required: true,
        min: 0
    },
    releaseDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    isBought: {
        type: Boolean,
        default: false
    },
    isWishlist: {
        type: Boolean,
        default: false
    },
    boughtMedium: {
        type: [String],
        required: false,
        enum: ['cd', 'vinyl'],
        trim: true,
        lowercase: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now()
    },
    albumBought: {
        type: Date,
        required: false
    },
    username: {
        type: String,
        minlength: 1,
        maxlength: 250,
        required: false
    }
});

const Album = mongoose.model('Album', albumSchema);

exports.Album = Album;
exports.albumSchema = albumSchema;