const express = require("express")
const { verifytoken } = require("../middleware/auth.token")


module.exports = (logger) => {
    const router = express.Router()


    const { getProfile } = require("../controllers/user.controller")(logger)


    router.get("/getprofile", verifytoken, getProfile)


    return router
}