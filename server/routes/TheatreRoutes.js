const express = require('express');
const router = express.Router();
const { addTheatre, getAllTheatres, getTheatresByOwner, updateTheatreById, deleteTheatreById } = require('../controller/TheatreController');

router.post('/', addTheatre);
router.get('/', getAllTheatres);
router.put('/', updateTheatreById);
router.delete('/', deleteTheatreById);
router.get('/getByOwner', getTheatresByOwner);

module.exports = router;