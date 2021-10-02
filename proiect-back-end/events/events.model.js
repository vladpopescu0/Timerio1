const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userId: {type: DataTypes.BIGINT, allowNull: false},
        title: { type: DataTypes.STRING, allowNull: false },
        text: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false },
        time: { type: DataTypes.DATE, allowNull: false },
        start: {type: DataTypes.DATE, allowNull:false},
        completion: {type: DataTypes.STRING, allowNull:false}
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('Event', attributes, options);
}