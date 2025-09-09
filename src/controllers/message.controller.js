const { Message, User, Chat } = require("../models")
const kafka = require("../config/kafka")
const readline = require("../utils/encryption")
const { encrypt, decrypt } = require("../utils/encryption")
const { text } = require("express")


module.exports = () => {
    const sendMessage = async (req, res) => {
        try {
            const { chatId, content } = req.body
            const userId = req.user.id
            const encryptedText = encrypt(content)
            const message = await Message.create({
                chatId,
                senderId: userId,
                content: encryptedText
            })
            await kafka.producer.send({
                topic: "message",
                messages: [{ value: JSON.stringify({ chatId, senderId: userId, content }) }]
            })
            req.io.to(chatId.toString()).emit("newMessage", {
                id: message.id,
                chatId,
                senderId: userId,
                content,
                createdAt: message.createdAt
            })

            res.json({
                success: true,
                message
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                Error: error.message
            })
        }

    }

    const getMessages = async (req, res) => {
        try {
            const { chatId } = req.params
            const messages = await Message.findAll({
                where: { chatId },
                include: [{ model: User, as: "sender", attributes: ["id", "name", "photo"] }],
                order: [["createdAt", "ASC"]]
            })
            const decrypted = messages.map((m) => ({
                ...m.toJSON(),
                content: decrypt(m.content)
            }))
            res.json({
                success: true, messages: decrypted
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                Error: error.message
            })
        }
    }

    const setupTerminalMessage = (io) => {
        readline.onMessage(async (text) => {
            const userId = 1
            const chatId = 1
            const encryptedText = encrypt(text)
            const message = await Message.create({
                chatId,
                senderId: userId,
                content: encryptedText
            })
            io.to(chatId.toString()).emit("newMessage", {
                id: message.id,
                chatId,
                senderId: userId,
                content: text,
                createdAt: message.createdAt
            })
            console.log(`Terminal Message sent -> ${text}`)
        })
    }



    return {
        sendMessage,
        getMessages,
        setupTerminalMessage
    }
}