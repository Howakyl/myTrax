const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    playlistName: {
        type: String,
        required: true,
    },
    genre: {
        type: [String],
        required: true
    },
} , {timestamps: true});

const Playlist = mongoose.model('Playlist' , playlistSchema);

module.exports = Playlist;