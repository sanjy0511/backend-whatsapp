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
            type: DataTypes.INTEGER, allowNull: true
        },
        type: {
            type: DataTypes.ENUM("text", "image", "document", "location", "contact"), allowNull: false, defaultValue: "text"
        },
        encryptedContent: {
            type: DataTypes.TEXT("long"), allowNull: false
        },
        iv: {
            type: DataTypes.STRING(32), allowNull: false
        },
        metadata: {
            type: DataTypes.JSON, allowNull: true
        },
        isEdited: {
            type: DataTypes.BOOLEAN, defaultValue: false
        },
        deletedAt: {
            type: DataTypes.DATE, allowNull: true
        }

    }, {
        tableName: "Messages",
        timestamps: true,
        indexes: [{ fields: ["chatId"] }, { fields: ["senderId"] }]
    })
}