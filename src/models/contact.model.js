const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define("Contact", {
        id: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
        },
        ownerUserId: {
            type: DataTypes.INTEGER, allowNull: false
        },
        contactPhone: {
            type: DataTypes.STRING(32)
        },
        contactName: {
            type: DataTypes.STRING(100), allowNull: true
        }
    }, {
        tableName: "Contacts",
        timestamps: true,
        indexes: [{ fields: ["ownerUserId"] }, { fields: ["contactPhone"] }]
    })
}