const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define("Otp", {
        id: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
        },
        phone: {
            type: DataTypes.STRING, allowNull: false
        },
        code: {
            type: DataTypes.STRING, allowNull: false
        },
        expiresAt: {
            type: DataTypes.DATE, allowNull: false
        },
        verified: {
            type: DataTypes.BOOLEAN, defaultValue: false
        }
    }, {
        tableName: "Otps",
        timestamps: true
    })
}