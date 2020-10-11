const express = require('express');
const { Playlist } = require('../models');
const router = express.Router();

const db = require('../models');


//GET INDEX
router.get('/' , (req,res) => {

    db.Playlist.find({}, (err,allPlaylists) => {
        if (err) return console.log(err);
        const context = {
            playlists: allPlaylists
        };
    
        res.render('playlists/index' , context);
    });
});

//GET NEW
router.get('/new' , (req,res) => {
    res.render('playlists/new');
});

//GET Show playlists
router.get('/:playlistId' , (req,res) => {
    db.Playlist.findById(req.params.playlistId , (err, foundPlaylist) => {
        if (err) return console.log(err);

        const context = {
            playlist: foundPlaylist
        };
        res.render('playlists/show' , context);
    });
});

//POST - Create playlist
router.post('/' , (req,res) => {
    db.Playlist.create(req.body, (err, newPlaylist) => {
        if (err) return console.log(err);

        res.redirect('/playlists');
    });
});





module.exports = router;