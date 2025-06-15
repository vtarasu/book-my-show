const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1]; // Extract token from Authorization header
    console.log("Token received:", token);
    if(!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body = { "userId": verifiedToken.userId };
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = authMiddleware;