const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
    },
    albumsBought: {
        type: Number,
        required: true,
    }
})

const Stats = mongoose.model('Stats', userSchema)
exports.Stats = Stats
