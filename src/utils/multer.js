const multer = require("multer")
const _default = require("otp-generator")
const path = require("path")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + "-" + uniqueSuffix + ext)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
        cb(null, true)
    } else {
        cb(new Error("only for image and videos are allowed"), false)
    }
}

const upload = multer({ storage, fileFilter })
module.exports = upload