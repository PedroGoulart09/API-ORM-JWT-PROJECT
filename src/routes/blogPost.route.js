const express = require('express');
const controllerCategories = require('../controller/blogPost.controller');
const tokenValidations = require('../middlewares/authToken');

const blogPost = express.Router();

blogPost.get('/post', tokenValidations, controllerCategories.getAllPosts);
blogPost.get('/post/:id', tokenValidations, controllerCategories.getByPostId);
blogPost.post('/post', tokenValidations, controllerCategories.createPost);

module.exports = blogPost;