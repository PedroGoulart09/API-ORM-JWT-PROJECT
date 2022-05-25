module.exports = (sequelize, DataTypes) => {
    const blogPost = sequelize.define('BlogPost', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        title: DataTypes.STRING,

        content: DataTypes.STRING,

        userId: DataTypes.INTEGER,

        published: DataTypes.DATE,

        updated: DataTypes.DATE

    }, {
        timestamps: false,
    });
    blogPost.associate = ({ User }) => {
        blogPost.belongsTo(User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE'
        });
    }

    return blogPost;
};
