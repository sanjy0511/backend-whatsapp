const express = require('express');
const { verifytoken } = require('../middleware/auth.token');

module.exports = (logger) => {

    const router = express.Router()


    const { sendMessage, getMessages } = require("../controllers/message.controller")(logger)

    router.post("/sendmessage", verifytoken, sendMessage)
    router.get("/getmessage", verifytoken, getMessages)

    return router
}