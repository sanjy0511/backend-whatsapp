const { Sequelize } = require("sequelize")



const sequelize = new Sequelize(
    process.env.SQL_DATABASE,
    process.env.SQL_USER,
    process.env.SQL_PASSWORD,
    {
        host: process.env.HOST,
        port: process.env.SQL_PORT,
        dialect: "mysql",
        logging: false,
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        }
    }
)

module.exports = sequelize



