const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DB_URI;

const db = async() => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = db;