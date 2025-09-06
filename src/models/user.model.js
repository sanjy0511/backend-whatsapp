const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
        },
        phone: {
            type: DataTypes.STRING(32), unique: true, allowNull: false
        },
        name: {
            type: DataTypes.STRING(100), allowNull: true
        },

        avatar: {
            type: DataTypes.STRING(255), allowNull: true
        },
        about: {
            type: DataTypes.STRING(255), allowNull: true, defaultValue: "Hey I'm using whatsapp"
        },
        lastSeen: {
            type: DataTypes.DATE, allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN, defaultValue: false
        },
    }, {
        tableName: "Users",
        timestamps: true,
        indexes: [
            { unique: true, fields: ["phone"] }
        ]
    })
}