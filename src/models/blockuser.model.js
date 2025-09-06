const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    return sequelize.define("blockedUser", {
        id: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true

        },
        ownerUserId: {
            type: DataTypes.INTEGER, allowedNull: false
        },
        blockedUserId: {
            type: DataTypes.INTEGER, allowedNull: false
        }
    }, {
        tableName: "blockedUsers",
        timestamps: true,
        indexes: [{ fields: ["ownerUserId"] }, { fields: ["blockedUserId"] }],
        uniqueKeys: {
            unique_block: {
                fields: ["ownerUserId", "blockedUserId"]
            }
        }
    })
}