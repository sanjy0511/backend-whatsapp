const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define("UserChatSetting", {
        id: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER, allowNull: false
        },
        chatId: {
            type: DataTypes.INTEGER, allowNull: false
        },
        isMuted: {
            type: DataTypes.BOOLEAN, defaultValue: false
        },
        lastNotifiedAt: {
            type: DataTypes.DATE, allowNull: true
        }
    }, {
        tableName: "UserChatSettings"
    })
}