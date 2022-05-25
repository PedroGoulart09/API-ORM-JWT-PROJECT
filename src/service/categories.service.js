const utilsError = require('../../utils/errorUtils');
const { Category } = require('../database/models');

const validationNameCategory = (name) => {
    if (!name) throw utilsError(400, '"name" is required');
    return true;
};

const getAllCategory = async () => {
    const getAll = await Category.findAll();
    return getAll;
};

const getById = async (categoryIds) => {
    const getId = await Category.findOne({ where: { id: categoryIds } });
    return getId;
};

const createCategories = async (name) => {
    const createCategorie = await Category.create({ name });
    return createCategorie;
};

module.exports = { validationNameCategory, getAllCategory, getById, createCategories };
