const { Chat, Chatmember, User, Message } = require("../models")


const createChat = async (req, res) => {
    try {
        const { type, members, name } = req.body
        const userId = req.user.id
        if (!members.includes(userId)) members.push(userId)
        const chat = await Chat.create({ type, name })

        const chatMembers = members.map((m) => ({ chatId: chat.id, userId: m }))
        await Chatmember.bulkCreate(chatMembers)
        res.json({
            success: true,
            chat
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}


const getChats = async (req, res) => {
    try {
        const userId = req.user.id
        const chats = await Chat.findAll({
            include: [
                {
                    model: Chatmember,
                    where: { userId },
                    include: [{ model: User, attributes: ["id", "name", "phone"] }]
                },
                {
                    model: Message,
                    limit: 1,
                    order: [["createdAt", "DESC"]]

                }
            ]
        })
        res.json({ success: true, chats })
    } catch (error) {
        res.json({
            error: error.message
        })
    }

    const addMember = async (req, res) => {
        try {
            const { chatId, userId } = req.body
            await Chatmember.create({
                chatId, userId
            })
            res.json({ success: true, message: "Member added" })
        } catch (error) {
            res.json({ Error: error.message })
        }
    }

    const removeMember = async (req, res) => {
        try {
            const { chatId, userId } = req.body
            await Chatmember.destroy({ where: { chatId, userId } })
            res.json({
                success: true,
                message: "remove member"
            })

        } catch (error) {
            res.status(500).json({ Error: error.message })
        }
    }



    return {
        createChat,
        getChats,
        addMember,
        removeMember
    }
}

