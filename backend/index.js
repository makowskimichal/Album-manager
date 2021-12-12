const albums = require('./routes/albums');
const authorizeSpotify = require('./routes/authorizeSpotify');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Spotify-clone', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/api/authorizeSpotify', authorizeSpotify)
app.use('/api/albums', albums);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});