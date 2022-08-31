const mongoose = require('mongoose')

const statsSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
    },
    albumsBought: {
        type: Number,
        required: true,
    },
    uniqueArtists: {
        type: Number,
        required: true,
    },
    listenedTracks: {
        type: Number,
        required: true,
    }
})

const Stats = mongoose.model('Stats', statsSchema)
exports.Stats = Stats
