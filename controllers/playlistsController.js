const express = require('express');
const { Playlist } = require('../models');
const router = express.Router();

const db = require('../models');


//GET INDEX
router.get('/' , (req,res) => {

    db.Playlist.find({})
        .populate('song')
        .exec((err,allPlaylists) => {
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

//GET Show playlist
router.get('/:playlistId' , (req,res) => {
    db.Playlist.findById(req.params.playlistId)
    .populate('song')
    .exec((err, foundPlaylist) => {
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

//GET - Edit
router.get('/:playlistId/edit' , (req,res) => {
    db.Playlist.findById(req.params.playlistId)
        .populate('song')
        .exec((err,foundPlaylist) => {
            if (err) return console.log(err);
    
            const context = {
                playlist: foundPlaylist,
            };
            res.render('playlists/edit' , context);
        });
});

//PUT - Update
router.put('/:playlistId' , (req,res) => {
    db.Playlist.findByIdAndUpdate(
        req.params.playlistId,
        req.body,
        {new: true},
        (err, updatedPlaylist) => {
        if (err) return console.log(err);

        console.log(updatedPlaylist);
        res.redirect(`/playlists/${updatedPlaylist._id}`);
    });
});

//DELETE - Remove playlist
router.delete('/:playlistId' , (req,res) => {
    db.Playlist.findByIdAndDelete(req.params.playlistId , (err, deletedPlaylist) => {
        if (err) return console.log(err);

        db.Song.deleteMany({_id: {$in: deletedPlaylist.song}} , (err, result) => {
            if (err) return console.log(err);

            console.log('deleted: ' , result);
            res.redirect('/playlists');
        });
    });
});

module.exports = router;