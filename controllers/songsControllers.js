const express = require('express');
const router = express.Router();

const db = require('../models');

// GET INDEX
router.get('/', (req, res) => {
    db.Song.find({}, (err, allSongs) => {
        if(err) return console.log(err);

        const context = {
            songs: allSongs,
        };
        res.render('songs/index', context);
    });
});

// GET NEW
router.get('/new', (req, res) => {
    db.Playlist.find({}, (err, allPlaylists) => {
        if(err) return console.log(err);

        const context = {
            playlists: allPlaylists
        };
        res.render('songs/new', context);
    });
});

// POST - create song
router.post('/', (req, res) => {
    db.Song.create(req.body, (err, newSong) => {
        if(err) return console.log(err);

        db.Playlist.findById(req.body.playlist, (err, foundPlaylist) => {
            if(err) return console.log(err);
            foundPlaylist.song.push(newSong._id);

            foundPlaylist.save((err, savedPlaylist) => {
                if(err) return console.log(err);
                console.log(savedPlaylist);
                res.redirect(`../playlists/${foundPlaylist.id}`)
            });
        });
    });
});

// GET - Edit 
router.get('/:songId/edit' , (req,res) => {
    db.Playlist.find({} , (err, allPlaylists) => {
        if (err) return console.log(err);

    db.Song.findById(req.params.songId, (err, foundSong) => {
        if (err) return console.log(err);

            const context = {
                song: foundSong,
                playlists: allPlaylists
            };
            res.render('songs/edit', context);
        });
    })
});

//PUT - Update
router.put('/:songId' , (req,res) => {
    db.Song.findByIdAndUpdate(
        req.params.songId,
        req.body,
        {new: true},
        (err, updatedSong) => {
            if (err) return console.log(err);
            console.log(updatedSong);

            res.redirect('../playlists');
        }
    );
});

//Delete
router.delete('/:songId' , (req,res) => {
    const songId = req.params.songId;

    db.Song.findByIdAndDelete(songId, (err) => {
        if (err) return console.log(err);

        db.Playlist.findOne({'song': songId} , (err, foundPlaylist) => {
            if (err) return console.log(err);

            foundPlaylist.song.remove(songId);
            foundPlaylist.save((err, updatedPlaylist) => {
                if (err) return console.log(err);

                console.log('updated:' , updatedPlaylist);
            });
        });
        res.redirect('/songs');
    });
});

module.exports = router;