const utilsError = require('../../utils/errorUtils');
const { User } = require('../database/models');

const validateUser = (body) => {
    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    );
    const { displayName, email, password } = body;

    if (displayName.length < 8) {
        throw utilsError(400, '"displayName" length must be at least 8 characters long');
    }
    if (!emailRegex.test(email)) {
        throw utilsError(400, '"email" must be a valid email');
    }
    if (password.length <= 5) {
        throw utilsError(400, '"password" length must be at least 6 characters long');
    }
    return true;
};

const createUser = async (displayName, email, password, image) => {
    const create = await User.create({
        displayName,
        email,
        password,
        image,
    });

    return create;
};

const getUsers = async () => {
    const getAllUsers = await User.findAll({ attributes: { exclude: 'password' } });
    return getAllUsers;
};

const getUserEmail = async (email) => {
    const result = await User.findOne({ where: { email } });
    return result;
};

const getUsersById = async (id) => {
    const getUsersIds = await User.findOne({ where: { id }, attributes: { exclude: 'password' } });
    if (!getUsersIds) throw utilsError(404, 'User does not exist');
    return getUsersIds;
};

module.exports = { validateUser, getUsers, getUsersById, getUserEmail, createUser };