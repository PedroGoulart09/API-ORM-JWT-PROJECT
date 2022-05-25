const jwt = require('jsonwebtoken');

const senhasecreta = process.env.JWT_SECRET;

const authToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Token not found' });
        }

        const decoded = jwt.verify(token, senhasecreta);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = authToken;