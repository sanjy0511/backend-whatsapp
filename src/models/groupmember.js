const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define("GroupMember", {
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
        }
    }, {
        tableName: "GroupMembers"
    })
}