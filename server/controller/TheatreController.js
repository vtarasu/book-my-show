const Theatre = require('../models/TheatreModel');


const addTheatre = async (req, res) => {
    try {
        const newTheatre = new Theatre(req.body);
        const savedTheatre = await newTheatre.save();
        return res.status(200).json({status: true, data: savedTheatre});
    } catch(error) {
        return res.status(500).json({status: false, message: 'Internal server error', error: error.message});
    }
}

const getAllTheatres = async(req, res) => {
    try {
        const thatres = await Theatre.find().populate('owner');
        return res.status(200).json({status: true, data: thatres});
    } catch(error) {
        return res.status(500).json({status: false, message: 'Internal server error', error: error.message});
    }
}

const updateTheatreById = async(req, res) => {
    try {
        const theatreId = req.body.theatreId;
        const updatedTheatre = await Theatre.findByIdAndUpdate(theatreId, req.body, {new : true});
        if(!updatedTheatre) {
            return res.status(404).json({status: false, message: 'Theatre not found'});
        }
        return res.status(200).json({status: true, message: 'Theatre updated successfully', data: updatedTheatre});
    } catch(error) {
        return res.status(500).json({status: false, message: 'Internal server error', error: error.message});   
    }
}

const deleteTheatreById = async(req, res) => {
    try {
        const theatreId = req.body.theatreId;
        await Theatre.findByIdAndDelete(theatreId);
        return res.status(200).json({status: true, message: 'Theatre deleted successfully'});
    } catch(error) {
        return res.status(500).json({status: false, message: 'Internal server error', error: error.message});   
    }
}

const getTheatresByOwner = async (req, res) => {
    try {
        const ownerId = req.body.ownerId;
        const theatres = await Theatre.find({owner: ownerId});
        res.send({status: true, data: theatres});
    } catch (error) {
        return res.status(500).json({status: false, message: 'Internal server error', error: error.message});
    }
}

module.exports = {
    addTheatre,
    getAllTheatres,
    updateTheatreById,
    deleteTheatreById,
    getTheatresByOwner
};