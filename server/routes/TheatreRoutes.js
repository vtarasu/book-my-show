const express = require('express');
const { addTheatre, getAllTheatres, getTheatresByOwner, updateTheatreById, deleteTheatreById } = require('../controller/TheatreController');

const router = express.Router();
router.post('/', addTheatre);
router.get('/', getAllTheatres);
router.put('/update', updateTheatreById);
router.delete('/', deleteTheatreById);
router.post('/getByOwner', getTheatresByOwner);

module.exports = router;