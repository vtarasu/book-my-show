const mongoose = require('mongoose');

const uri = "mongodb+srv://vthirunavukkarasu96:Sample@mongo-db-cluster.joat1dn.mongodb.net/?retryWrites=true&w=majority&appName=mongo-db-cluster";

const db = async() => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = db;