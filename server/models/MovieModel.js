 const mongoose =require('mongoose');

 const movieSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: true
    },
    description : {
        type: String,
        required: true
    },
    releaseDate : {
        type: String,
        required: true  
    },
    duration : {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    }
 });

 const movieModel = mongoose.model('Movie', movieSchema);
 module.exports = movieModel;
