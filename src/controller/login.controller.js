const generateToken = require('../../utils/generateJWT');
const utilsError = require('../../utils/errorUtils');
const { User } = require('../database/models');

const validateLogin = (body) => {
    const { email, password } = body;
    if (!email || !password) throw utilsError(400, 'Some required fields are missing');
    return true;
};

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!validateLogin(req.body)) return;
        const findUser = await User.findOne({ where: { email } });
        if (!findUser || findUser.password !== password) throw utilsError(400, 'Invalid fields');
        const value = findUser.dataValues;
        const { password: passDB, ...userWithoutPass } = value;
        const token = generateToken(userWithoutPass);
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(error.status).json({ message: error.message });
    }
};

module.exports = { createUser };