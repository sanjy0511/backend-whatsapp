require("dotenv").config()
const sequelize = require("./config/db")




const start = async () => {
    try {
        await sequelize.authenticate()
        console.log("mysql database connected successfully")
    } catch (error) {
        console.error(error.message)
    }
}
start()