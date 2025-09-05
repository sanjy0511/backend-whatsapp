const express = require("express")






module.exports = (logger) => {
    const router = express.Router()
    // const { register } = require("../controllers/user.controller")(logger)


    // router.post("/signup", register)


    return router
}