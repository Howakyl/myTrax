const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    playlistName: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        default: 'Pop',
        required: true
    },
    song: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }]
} , {timestamps: true});

const Playlist = mongoose.model('Playlist' , playlistSchema);

module.exports = Playlist;