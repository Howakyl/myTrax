const express = require('express');
const router = express.Router();

const db = require('../models');


//GET INDEX
router.get('/' , (req,res) => {

    res.render('playlists/index');
});

module.exports = router;