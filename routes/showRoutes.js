const express = require('express');
const router = express.Router();

const {addShow,getShow,getShowsByMovie,getShowsBytheatre} = require("../controllers/showController");
const { get } = require('mongoose');
const { getMovieById } = require('../controllers/movieController');

router.get('/:showId',getShow);
router.post('/',addShow);
router.get('/movie/:movieId',getShowsByMovie);
router.get('/theatre/:theatreId',getShowsBytheatre);

module.exports = router;