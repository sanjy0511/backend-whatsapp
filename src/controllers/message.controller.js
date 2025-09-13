const { Message, User, Chat } = require("../models")
const kafka = require("../config/kafka")
const readline = require("../utils/readline")
const { encrypt, decrypt } = require("../utils/encryption")



module.exports = () => {
    const sendMessage = async (req, res) => {
        try {
            const { chatId, content } = req.body
            const userId = req.user.id

            if (!chatId || !content) return res.status.json({ Message: "chatId and content is required" })

            const { iv, encryptedData } = encrypt(content)
            const message = await Message.create({
                chatId,
                senderId: userId,
                encryptedContent: encryptedData,
                iv
            })
            await kafka.sendToKafka("message", { chatId, senderId: userId, content })
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
                include: [{ model: User, as: "sender", attributes: ["id", "name", "avatar"] }],
                order: [["createdAt", "ASC"]]
            })
            const decrypted = messages.map((m) => ({
                ...m.toJSON(),
                decryptedContent: decrypt(m.iv, m.encryptedContent)
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
        readline.onMessage(async ({ chatId, senderId, message }) => {
            try {
                const chat = await Chat.findByPk(chatId)
                if (!chat) {
                    console.error(`chats ${chatId} does not exists`)
                    return
                }
                const user = await User.findByPk(senderId)
                if (!user) {
                    console.error(`user ${senderId} does not exist`)
                    return
                }

                const { iv, encryptedData } = encrypt(message);

                const msg = await Message.create({
                    chatId,
                    senderId,
                    encryptedContent: encryptedData,
                    iv
                });

                // Emit to all chat members
                io.to(chatId.toString()).emit("newMessage", {
                    id: msg.id,
                    chatId,
                    senderId,
                    content: message, // decrypted for display
                    createdAt: msg.createdAt,
                });

                console.log(`Terminal → Chat ${chatId}, User ${senderId}: ${message}`);
            } catch (err) {
                console.error("Error sending terminal message:", err.message);
            }
        });
    }



    return {
        sendMessage,
        getMessages,
        setupTerminalMessage
    }
}