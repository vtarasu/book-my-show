const express = require('express');
const router = express.Router();
const { addShow, getShowById, updateShowById, deleteShowById, getAllShowsByTheatre, getAllTheatresByMovie } = require('../controller/ShowController');

router.post('/', addShow);
router.put('/', updateShowById);
router.get('/', getShowById);
router.delete('/', deleteShowById);
router.post('/getAllShowsByTheatre', getAllShowsByTheatre);
router.post('/getAllTheatresByMovie', getAllTheatresByMovie);

module.exports = router;