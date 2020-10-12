// ---------- CONFIGURATION
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');

const ctrl = require('./controllers');

app.use(bodyParser.urlencoded({extended: false}));

// ---------- MIDDLEWARE
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// HOME
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/playlists', ctrl.playlists);
app.use('/songs', ctrl.songs);

// ---------- LISTENER
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
