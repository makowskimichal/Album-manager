const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.jwtPrivateKey

module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided');

    try{
        const decoded = jwt.verify(token, JWT_KEY);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.');
    }
}