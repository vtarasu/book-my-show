const UserModel = require('../models/UserModel');
const jwt = require("jsonwebtoken");

const login = async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({username: username, password: password});
        if(!user) {
            return res.status(401).json({message: 'Invalid creds'});
        }

        const token = jwt.sign({userId: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '10d'});
        return res.status(200).json({message: 'Login successful', data: token});
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({message: 'Internal server error'});
    }
}

const register = async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({email : req.body.email});
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new UserModel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            isAdmin: req.body.isAdmin || false,
            role: req.body.role || 'user'
        });
        const savedUser = await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    };
};

const getCurrentUser = async(req, res) => {
    try {
        const id = req.body.userId;
        const user = await UserModel.findById(id).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    register, login, getCurrentUser
};