module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        displayName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        timestamps: false,
        tableName: 'Users',
    });
    user.associate = ({ BlogPost }) => {
        user.hasMany(BlogPost, {
            foreignKey: 'id',
            as: 'BlogPost',
            onDelete: 'CASCADE'
        })
    }

    return user;
};
