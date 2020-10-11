const express = require('express');
const router = express.Router();

const db = require('../models');

// GET INDEX
// router.get('/', (req, res) => {
//     res.render()
// });

// GET NEW
router.get('/new', (req, res) => {
    res.render('songs/new')
});

module.exports = router;