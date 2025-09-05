const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define("Contact", {
        id: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER, allowNull: false
        },
        contactId: {
            type: DataTypes.INTEGER, allowNull: false
        }
    }, {
        tableName: "Contacts"
    })
}