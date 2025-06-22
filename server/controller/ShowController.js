const Show = require('../models/ShowModel');

const addShow = async (req, res) => {
    try {
        const show = new Show(req.body);
        const savedShow = await show.save();
        return res.status(201).json({ status:true, message: 'Show added successfully', data: savedShow });
    } catch (error) {
        return res.status(500).json({ status:false, message: 'Internal server error', error: error.message });
    }
}

const getShowById = async (req, res) => {
    try {
        const showId = req.body.showId;
        const show = await Show.findById(showId).populate('movie').populate('theatre');
        if (!show) {
            return res.status(404).json({ status:false, message: 'Show not found' });
        }
        return res.status(200).json({ status:true, message: 'Show fetched successfully', data: show });
    } catch(error) {
        return res.status(500).json({ status:false, message: 'Internal server error', error: error.message });
    }
}

const deleteShowById = async (req, res) => {
    try {
        const showId = req.body.showId;
        const show = await Show.findByIdAndDelete(showId);
        if (!show) {
            return res.status(404).json({ status:false, message: 'Show not found' });
        }
        return res.status(200).json({ status:true, message: 'Show deleted successfully' });
    } catch (error) {
        return res.status(500).json({ status:false, message: 'Internal server error', error: error.message });
    }
}

const updateShowById = async(req, res) => {
    try {
        const showId = req.body.showId;
        const updatedShow = await Show.findByIdAndUpdate(showId, req.body, { new: true });
        if (!updatedShow) {
            return res.status(404).json({ status:false, message: 'Show not found' });
        }
        return res.status(200).json({ status:true, message: 'Show updated successfully', data: updatedShow });
    } catch (error) {
        return res.status(500).json({ status:false, message: 'Internal server error', error: error.message });
    }
}

const getAllShowsByTheatre = async (req, res) => {
    try {
        const theatreid = req.body.theatreid;
        const show = await Show.find({theatre: theatreid}).populate('movie');
        return res.status(200).json({ status:true, message: 'Shows fetched successfully', data: show });    
    } catch (error) { 
        return res.status(500).json({ status:false, message: 'Internal server error', error: error.message });
    }
}

const getAllTheatresByMovie = async (req, res) => {
    try {
        const {movie, date} = req.body;
        const shows = await Show.find({ movie: movie, date: date }).populate('theatre');
        const uniqueTheatres = [];
        shows.forEach(show => {
            const isAlreadyPresent = uniqueTheatres.find((theatre) => theatre._id === show.theatre._id);
            if(!isAlreadyPresent) {
               const showsOfThisTheatre = shows.filter(showItem => showItem.theatre._id === show.theatre._id);
               uniqueTheatres.push({...show.theatre._doc, shows: showsOfThisTheatre});
            }
        })
        
        return res.status(200).json({ status:true, message: 'Theatres fetched successfully', data: uniqueTheatres });    
    } catch (error) { 
        return res.status(500).json({ status:false, message: 'Internal server error', error: error.message });
    }
}

module.exports = {
    addShow,
    getShowById,
    deleteShowById,
    updateShowById,
    getAllShowsByTheatre,
    getAllTheatresByMovie
};