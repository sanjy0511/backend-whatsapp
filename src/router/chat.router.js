const express = require('express');
const { verifytoken } = require('../middleware/auth.token');


module.exports = (logger) => {

    const router = express.Router()
    const { createChat, getChats, addMember, removeMember } = require("../controllers/chat.controller")()

    router.post("/createchat", verifytoken, createChat)
    router.get("/getchats", verifytoken, getChats)
    router.post("/addmember", verifytoken, addMember)
    router.post("/removemember", verifytoken, removeMember)



    return router

}