const serviceCategories = require('../service/categories.service');

const createCategories = async (req, res) => {
    try {
        const { name } = req.body;
        serviceCategories.validationNameCategory(name);
        const createCategorie = await serviceCategories.createCategories(name);
        const create = createCategorie.dataValues;
        return res.status(201).send(create);
    } catch (error) {
        return res.status(error.status).json({ message: error.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const getAll = await serviceCategories.getAllCategory();
        return res.status(200).json(getAll);
    } catch (error) {
        return res.status(error.status).json({ message: error.message });
    }
};

module.exports = { createCategories, getAllCategories };