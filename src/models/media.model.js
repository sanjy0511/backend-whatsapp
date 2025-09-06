const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    return sequelize.define(
        "Media", {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        messageId: {
            type: DataTypes.INTEGER, allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER, allowNull: true
        },
        encryptedFilePath: {
            type: DataTypes.STRING(255), allowNull: false
        },
        thumbPath: {
            type: DataTypes.STRING(255), allowNull: true
        },
        mimetype: {
            type: DataTypes.STRING(100), allowNull: true
        },
        size: {
            type: DataTypes.INTEGER, allowNull: true
        }
    }, {
        tableName: "media",
        timestamps: true,
        indexes: [{ fields: ["messageId"] }, { fields: ["userId"] }]
    }
    )
}