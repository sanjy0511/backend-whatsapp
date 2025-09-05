const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
        },
        name: {
            type: DataTypes.STRING, allowNull: false
        },
        email: {
            type: DataTypes.STRING, unique: true, allowNull: true
        },
        phone: {
            type: DataTypes.STRING, unique: true, allowNull: true
        },
        password: {
            type: DataTypes.STRING, allowNull: false
        },
        profilePic: {
            type: DataTypes.STRING, allowNull: true
        },
        statusMessage: {
            type: DataTypes.STRING, allowNull: true, defaultValue: "Hey I'm using whatsapp"
        },
        lastSeen: {
            type: DataTypes.DATE, allowNull: true
        },
        isOnline: {
            type: DataTypes.BOOLEAN, defaultValue: false
        },
    }, {
        tableName: "Users",
        indexes: [
            { unique: true, fields: ["email"] },
            { unique: true, fields: ["phone"] }
        ]
    })
}