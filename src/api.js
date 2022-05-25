const express = require('express');
const loginUser = require('./routes/login.route');
const user = require('./routes/user.route');
const categories = require('./routes/categories.route');
const blog = require('./routes/blogPost.route');

const app = express();

app.use(express.json());
app.use(loginUser);
app.use(user);
app.use(categories);
app.use(blog);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
