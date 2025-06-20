const express = require('express');
const {addMovie, getAllMovies, getMovieById, updateMovieById, deleteMovieById} = require('../controller/MovieController');
const { route } = require('./UserRoutes');

const router = express.Router();
router.post('/add', addMovie);
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.put('/:id', updateMovieById);
router.delete('/:id', deleteMovieById);

module.exports = router;