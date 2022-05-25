const jwt = require('jsonwebtoken');

const senhasecreta = process.env.JWT_SECRET;

const jwtConfig = {
    expiresIn: '20m',
    algorithm: 'HS256',
};

const generateJWT = (payload) => {
    const generateToken = jwt.sign({ data: payload }, senhasecreta, jwtConfig);

    return generateToken;
};

module.exports = generateJWT;