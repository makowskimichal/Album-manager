const mongoose = require('mongoose');
const Joi = require('joi');
const { boolean } = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const albumSchema = new mongoose.Schema({
    artistName: {
        type: String,
        minlength: 1,
        maxlength: 50,
        required: true
    },
    artistId: {
        type: String,
        minlength: 1,
        maxlength: 50,
        required: true 
    },
    imageUrl: {
        type: String,
        minlength: 1,
        maxlength: 250,
        required: true
    },
    albumName: {
        type: String,
        minlength: 1,
        maxlength: 50,
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
        default: Date.now
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    isPlanned: {
        type: Boolean,
        default: false
    },
    isListened: {
        type: Boolean,
        default: false
    },
    isBought: {
        type: Boolean,
        default: false
    }
});

const Album = mongoose.model('Album', albumSchema);

exports.Album = Album;
exports.albumSchema = albumSchema;