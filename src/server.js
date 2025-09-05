require("dotenv").config()
const sequelize = require("./config/db")




const start = async () => {
    try {
        //mysql connect
        await sequelize.authenticate()
        console.log("mysql database connected successfully")
        // creating a table or column 
        await sequelize.sync({ alter: true })
        console.log("all table are created in DB")
    } catch (error) {
        console.error(error.message)
    }
}
start()