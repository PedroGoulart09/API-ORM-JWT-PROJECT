module.exports = (sequelize, DataTypes) => {
    const postCategory = sequelize.define('PostCategory', {
        postId: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        categoryId: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
    }, {
        timestamps: false,
    });

    postCategory.associate = ({ Category, BlogPost }) => {
        Category.belongsToMany(BlogPost, {
            as: 'blogPosts',
            through: postCategory,
            foreignKey: 'categoryId',
            otherKey: 'postId',
            onDelete: 'CASCADE',
        });

        BlogPost.belongsToMany(Category, {
            as: 'categories',
            through: postCategory,
            foreignKey: 'postId',
            otherKey: 'categoryId',
            onDelete: 'CASCADE',
        });
    }

    return postCategory;
};
