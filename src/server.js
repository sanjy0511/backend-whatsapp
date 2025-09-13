const express = require("express")
const app = express()
const http = require("http")
require("dotenv").config();
const { Server } = require("socket.io")
const { startReadline } = require("./utils/readline")
const { setupTerminalMessage } = require("./controllers/message.controller")()
const logger = require("./utils/logger")
const authRoutes = require("./router/auth.router")
const userRoutes = require("./router/user.router")
const contactRoutes = require("./router/contact.router")
const chatRoutes = require("./router/chat.router")
const messageRoutes = require("./router/message.router")
const { sequelize } = require("./models");
const { initKafka } = require("./config/kafka");




app.use(express.json())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})


const kafkaStart = async () => {
    await initKafka()
}
kafkaStart()

startReadline(io)
setupTerminalMessage(io)

app.use(authRoutes(logger))
app.use(userRoutes(logger))
app.use(contactRoutes(logger))
app.use(chatRoutes(logger))
app.use(messageRoutes(logger))

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

