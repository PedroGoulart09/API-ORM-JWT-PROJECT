const generateToken = require('../../utils/generateJWT');
const serviceUser = require('../service/user.service');

const searchBD = async (req, res, next) => {
    try {
        const { email } = req.body;
        const result = await serviceUser.getUserEmail(email);
        if (!serviceUser.validateUser(req.body)) return;
        if (result) return res.status(409).json({ message: 'User already registered' });
    } catch (error) {
        return res.status(error.status).json({ message: error.message });
    }
    next();
};

const createUser = async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
        const create = await serviceUser.createUser(displayName, email, password, image);
        const value = create.dataValues;
        const { password: passDB, ...userWithoutPass } = value;
        const token = generateToken(userWithoutPass);
        return res.status(201).json({ token });
    } catch (error) {
        return res.status(error.status).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const getAllUsers = await serviceUser.getUsers();
        return res.status(200).json(getAllUsers);
    } catch (error) {
        return res.status(error.status).json({ message: error.message });
    }
};

const getUsersById = async (req, res) => {
    try {
        const { id } = req.params;
        const getUsersId = await serviceUser.getUsersById(id);
        return res.status(200).json(getUsersId);
    } catch (error) {
        return res.status(error.status).json({ message: error.message });
    }
};

module.exports = { searchBD, createUser, getUsers, getUsersById };