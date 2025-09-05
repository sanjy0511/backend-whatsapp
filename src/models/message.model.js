const { DataTypes } = require("sequelize")



module.exports = (sequelize) => {
    return sequelize.define("Message", {
        id: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
        },
        chatId: {
            type: DataTypes.INTEGER, allowNull: false
        },
        senderId: {
            type: DataTypes.INTEGER, allowNull: false
        },
        message: {
            type: DataTypes.INTEGER, allowNull: false
        },
        status: {
            type: DataTypes.ENUM("sent", "delivered", "read"), defaultValue: "sent"
        },
        sendAt: {
            type: DataTypes.DATE, defaultValue: DataTypes.NOW
        },
        deliveredAt: {
            type: DataTypes.DATE, allowNull: true
        },
        readAt: {
            type: DataTypes.DATE, allowNull: true
        }
    }, {
        tableName: "Messages"
    })
}