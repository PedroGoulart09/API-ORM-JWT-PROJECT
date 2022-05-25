const serviceCategories = require('./categories.service');
const utilsError = require('../../utils/errorUtils');
const { BlogPost, User, Category } = require('../database/models');

const validatePost = (title, content, categoryIds) => {
    if (!title || !content || !categoryIds) {
        throw utilsError(400, 'Some required fields are missing');
    }
    return true;
};

const validateCategoryId = async (categoryIds) => {
    const categoriesId = categoryIds.map(async (category) => {
        const validateId = await serviceCategories.getById(category);
        if (!validateId) throw utilsError(400, '"categoryIds" not found');
    });

    await Promise.all(categoriesId);
    return true;
};

const getAllPosts = async () => {
    const getAll = await BlogPost.findAll({
        include: [
            {
                model: User,
                as: 'user',
                attributes: {
                    exclude: ['password'],
                },
            },
            {
                model: Category,
                as: 'categories',
            },
        ],
    });
    return getAll;
};

const getByPostId = async (id) => {
    const response = await BlogPost.findByPk(id, {
        include: [
            {
                model: User,
                as: 'user',
                attributes: {
                    exclude: ['password'],
                },
            },
            {
                model: Category,
                as: 'categories',
            },
        ],
    });

    if (!response) throw utilsError(404, 'Post does not exist');

    return response;
};

module.exports = { validatePost, validateCategoryId, getAllPosts, getByPostId };
