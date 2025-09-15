const express = require("express")
const { verifytoken } = require("../middleware/auth.token")
const upload = require("../utils/multer")



module.exports = (logger) => {
    const router = express.Router()
    const { uploadMedia, getMedia, deleteMedia } = require("../controllers/media.controller")(logger)

    router.post("/upload", verifytoken, upload.single("file"), uploadMedia)
    router.get("chat/:chatId", verifytoken, getMedia)
    router.delete("/:mediaId", verifytoken, deleteMedia)




    return router
}