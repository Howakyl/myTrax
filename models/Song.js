const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
    songName: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    album: {
        type: String,
    },
    link: {
        type: String,
    }, 
    playlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist'
    }   
}, {timestamps: true});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;