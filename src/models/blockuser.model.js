const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    return sequelize.define("blockedUser", {
        id: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true

        },
        userId: {
            type: DataTypes.INTEGER, allowedNull: false
        },
        blockedUserId: {
            type: DataTypes.INTEGER, allowedNull: false
        }
    }, {
        tableName: "blockedUsers"
    })
}