const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    return sequelize.define("Chat", {
        id: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
        },
        type: {
            type: DataTypes.ENUM("direct", "group"), allowNull: false, defaultValue: "direct"
        },
        metadata: {
            type: DataTypes.JSON, allowNull: true
        },
        lastMessageId: {
            type: DataTypes.INTEGER, allowNull: true
        }
    }, {
        tableName: "Chats",
        timestamps: true,
        indexes: [{ fields: ["type"] }]
    })
}