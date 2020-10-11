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

//POST - Create playlist
router.post('/' , (req,res) => {
    db.Playlist.create(req.body, (err, newPlaylist) => {
        if (err) return console.log(err);

        res.redirect('/playlists');
    });
});





module.exports = router;