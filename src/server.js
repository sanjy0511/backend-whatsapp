const express = require("express")
const app = express()
const http = require("http")
require("dotenv").config()
const logger = require("./utils/logger")
const authRoutes = require("./router/auth.router")
const userRoutes = require("./router/user.router")
const { sequelize } = require("./models")



app.use(express.json())
const server = http.createServer(app)

app.use(authRoutes(logger))
app.use(userRoutes(logger))

const port = process.env.PORT || 4000

const start = async () => {
    try {
        //mysql connect
        await sequelize.authenticate()
        console.log("mysql database connected successfully")
        // creating a table or column 
        await sequelize.sync()
        console.log("all table are created in DB")
        server.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);

        })

    } catch (error) {
        console.error(error.message)
    }
}
start()

