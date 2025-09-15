const { Media, Message } = require("../models")
const { sendToKafka } = require("../config/kafka")
const fs = require("fs")
const path = require("path")


module.exports = () => {
    const uploadMedia = async (req, res) => {
        try {
            if (!req.file) return res.status(404).json({ message: "no file uploads" })
            const { chatId, senderId } = req.body
            if (!chatId || !senderId) return res.status(404).json({ message: "chatId and senderId required" })

            const media = await Media.create({
                chatId,
                senderId,
                filename: req.file.filename,
                path: `/uploads/${req.file.filename}`,
                mimetype: req.file.mimetype,
                size: req.file.size
            })

            const message = await Message.create({
                chatId,
                senderId,
                mediaId: media.id
            })

            await sendToKafka("messages", {
                chatId,
                senderId,
                media: {
                    filename: media.filename,
                    path: media.path,
                    mimetype: media.mimetype,
                    size: media.size
                }
            })

            req.io.to(chatId.toString()).emit("newMedia", {
                messageId: media.id,
                chatId,
                senderId,
                media,
                createdAt: message.createdAt
            })
            res.json({ success: true, media, message })

        } catch (error) {
            res.status(500).json({ Error: error.message })
        }
    }


    const getMedia = async (req, res) => {
        try {
            const { chatId } = req.params
            const mediaFiles = await Media.findAll({
                where: { chatId },
                order: [["createdAt", "ASC"]]
            })
            res.json({ success: true, media: mediaFiles })
        } catch (error) {
            res.status(500).json({ Error: error.message })
        }
    }

    const deleteMedia = async (req, res) => {
        try {
            const { mediaId } = req.params
            const media = await Media.findByPk(mediaId)
            if (!media) return res.status(404).json({ message: "Media not found" })
            const filePath = path.join(__dirname, "../uploads", media.filename)
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
            await media.destroy()
            res.json({ success: true, message: "Media deleted successfully" })
        } catch (error) {
            res.status(500).json({ Error: error.message })
        }
    }


    return {
        uploadMedia,
        getMedia,
        deleteMedia
    }
}



