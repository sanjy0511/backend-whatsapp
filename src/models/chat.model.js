const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    return sequelize.define("Chat", {
        id: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
        },
        type: {
            type: DataTypes.ENUM("private", "group"), allowNull: false
        },
        createdBy: {
            type: DataTypes.INTEGER, allowNull: false
        }
    }, {
        tableName: "Chats"
    })
}