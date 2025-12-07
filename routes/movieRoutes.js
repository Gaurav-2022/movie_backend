const express = require('express');
const { addMovie,getAllMoviews,deleteMovie,updateMovie,getMovieById} = require('../controllers/movieController');
const router = express.Router();

router.get('/',getAllMoviews);
router.get('/:id',getMovieById);
router.post('/',addMovie);
router.delete('/:id',deleteMovie);
router.put('/:id',updateMovie);

module.exports = router;

