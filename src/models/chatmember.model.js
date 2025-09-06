const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define("ChatMember", {
        id: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
        },
        chatId: {
            type: DataTypes.INTEGER, allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER, allowNull: false
        },
        role: {
            type: DataTypes.ENUM("admin", "member"), defaultValue: "member"
        },
        joinedAt: {
            type: DataTypes.DATE, defaultValue: DataTypes.NOW
        }

    }, {
        tableName: "Chatmembers",
        timestamps: true,
        indexes: [{ fields: ["chatId"] }, { fields: ["userId"] }],
        uniqueKeys: {
            unique_member: {
                fields: ["chatId", "userId"]
            }
        }
    })
}