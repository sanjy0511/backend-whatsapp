const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define("Notification", {
        id: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER, allowedNull: false
        },
        type: {
            type: DataTypes.ENUM("message", "status", "group", "system"), allowedNull: false
        },
        content: {
            type: DataTypes.JSON, allowedNull: true
        },
        isRead: {
            type: DataTypes.BOOLEAN, defaultValue: false
        }
    }, {
        tableName: "Notifications"
    })
}