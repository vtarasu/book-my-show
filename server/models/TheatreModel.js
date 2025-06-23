const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }, 
        phone : {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: true
        },
        isActive : {
            type: Boolean,
            required: true
        }, 
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }, 
    {
        timestamps: true
    }
);

const TheatreModel = mongoose.model('Theatre', theatreSchema);
module.exports = TheatreModel;