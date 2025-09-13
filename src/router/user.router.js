const express = require("express")
const { verifytoken } = require("../middleware/auth.token")


module.exports = (logger) => {
    const router = express.Router()


    const { getProfile, updateProfile, blockedUser, unblockUser, listBlockedUsers } = require("../controllers/user.controller")(logger)


    router.get("/getprofile", verifytoken, getProfile)
    router.patch("/updateprofile", verifytoken, updateProfile)
    router.post("/blockuser", verifytoken, blockedUser)
    router.post("/unblockuser", verifytoken, unblockUser)
    router.get("/listofblock", verifytoken, listBlockedUsers)


    return router
}