'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Userstheme extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Userstheme.init({
        title: DataTypes.STRING,
        theme: { type: DataTypes.STRING, allowNull: false },
        userId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Userstheme',
    });
    return Userstheme;
};