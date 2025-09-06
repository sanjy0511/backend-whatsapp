const express = require("express")






module.exports = (logger) => {
    const router = express.Router()
    const { userRegister, Login } = require("../controllers/authcontroller")(logger)

    router.post("/request-otp", userRegister)
    router.post("/verify-otp", Login)

    return router
}