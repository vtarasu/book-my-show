const express = require('express');
const {
    register,
    login,
    getCurrentUser
} = require('../controller/UserController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/current-user',authMiddleware, getCurrentUser);

module.exports = router;