const movieModel = require('../models/Movie');

const addMovie = async (req, res) => {
    try {
        const { title, description, releaseDate, duration, genre, poster } = req.body;
        const newMovie = new movieModel({
            title,
            description,
            releaseDate,
            duration,
            genre,
            poster
        });
        const savedMovie = await newMovie.save();
        console.log("Movie added successfully:", savedMovie);
        return res.status(201).json({ message: 'Movie added successfully', data: savedMovie });
    } catch (Error) {
        console.error("Error adding movie:", Error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllMovies = async(req, res) => {
    try {
        const movies = await movieModel.find();
        return res.status(201).json({data:movies});
    } catch(error) {
        console.error("Error fetching all movies", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getMovieById = async(req, res) => {
    try {
        const movieId = req.params.id;
        console.log("Fetching movie with ID:", movieId);
        const movies = await movieModel.findById(movieId);
        return res.status(201).json({data:movies});
    } catch(error) {
        console.error("Error fetching movie", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const updateMovieById = async(req, res) => {
    try {
        const movieId = req.params.id;
        const { title, description, releaseDate, duration, genre, poster } = req.body;
        const movie = await movieModel.findByIdAndUpdate(movieId, {
            title,
            description,
            releaseDate,
            duration,
            genre,
            poster
        }, { new: true });  
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        return res.status(201).json({data:movie});
    } catch(error) {
        console.error("Error fetching movie", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteMovieById = async(req, res) => {
    try { 
        const movieId = req.params.id;
        const movie = await movieModel.findByIdAndDelete(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        return res.status(200).json({ message: 'Movie deleted successfully' });
    } catch(error) {
        console.error("Error deleting movie", error);
        return res.status(500).json({ message: 'Internal server error' });
    }   
}



module.exports = {
    addMovie, getAllMovies, getMovieById, updateMovieById, deleteMovieById  
}