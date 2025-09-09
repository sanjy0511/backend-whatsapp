const express = require("express")
const { verifytoken } = require("../middleware/auth.token")


module.exports = (logger) => {
    const router = express.Router()


    const { getProfile, updateProfile, blockedUser } = require("../controllers/user.controller")(logger)


    router.get("/getprofile", verifytoken, getProfile)
    router.patch("/updateprofile", verifytoken, updateProfile)
    router.post("/blockuser", verifytoken, blockedUser)


    return router
}