const serviceBlogPost = require('../service/blogPost.service');
const { BlogPost, PostCategory } = require('../database/models');

const createPost = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;
        serviceBlogPost.validatePost(title, content, categoryIds);
        await serviceBlogPost.validateCategoryId(categoryIds);
        const create = await BlogPost.create({
            title,
            content,
            userId: req.user.data.id,
            published: new Date(),
            updated: new Date(),
        });
        const categ = categoryIds.map(async (Id) => PostCategory.create({ Id, postId: create.id }));
        await Promise.all(categ);
        return res.status(201).json(create);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const getAll = await serviceBlogPost.getAllPosts();
        return res.status(200).json(getAll);
    } catch (error) {
        return res.status(error.status).json({ message: error.message });
    }
};

const getByPostId = async (req, res) => {
    try {
        const { id } = req.params;
        const getId = await serviceBlogPost.getByPostId(id);
        return res.status(200).json(getId);
    } catch (error) {
        return res.status(error.status).json({ message: error.message });
    }
};

module.exports = { createPost, getAllPosts, getByPostId };