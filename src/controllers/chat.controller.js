const { Chat, Chatmember, User, Message } = require("../models")



module.exports = () => {
    const createChat = async (req, res) => {
        try {
            const { type, members, name } = req.body;
            const userId = req.user.id;

            if (!members.includes(userId)) members.push(userId);

            //  Validate users
            const validUsers = await User.findAll({ where: { id: members } });
            const validUserIds = validUsers.map(u => u.id);

            if (validUserIds.length !== members.length) {
                return res.status(400).json({
                    success: false,
                    error: "One or more members do not exist"
                });
            }

            let chatName = name;

            //  Direct chat logic
            if (type === "direct") {
                if (validUserIds.length !== 2) {
                    return res.status(400).json({
                        success: false,
                        message: "Direct chat must have exactly 2 members"
                    });
                }

                // check if direct chat already exists
                const existingChat = await Chat.findOne({
                    where: { type: "direct" },
                    include: [
                        {
                            model: Chatmember,
                            as: "members",
                            where: { userId: validUserIds },
                            required: true
                        }
                    ]
                });

                if (existingChat) {
                    return res.status(404).json({
                        success: false,
                        chat: existingChat,
                        members: validUserIds,
                        message: "Direct chat already exists"
                    });
                }


                const otherUser = validUsers.find(u => u.id !== userId);
                chatName = otherUser ? otherUser.name : name;
            }

            //  Create only if not exists
            const chat = await Chat.create({ type, name: chatName });

            const chatMembers = validUserIds.map((m) => ({ chatId: chat.id, userId: m }));
            await Chatmember.bulkCreate(chatMembers);

            res.json({
                success: true,
                chat,
                members: validUserIds
            });

        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    };


    const getChats = async (req, res) => {
        try {
            const userId = req.user.id
            const chats = await Chat.findAll({
                include: [
                    {
                        model: Chatmember,
                        as: "members",
                        where: { userId },
                        include: [{ model: User, as: "user", attributes: ["id", "name", "phone"] }]
                    },
                    {
                        model: Message,
                        as: "messages",
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
    }
    const addMember = async (req, res) => {
        try {
            let { chatId, userId } = req.body;

            chatId = parseInt(chatId);
            userId = parseInt(userId);

            // check chat exists
            const chat = await Chat.findByPk(chatId);
            if (!chat) {
                return res.status(400).json({ success: false, message: "Chat does not exist" });
            }

            // check user exists
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(400).json({ success: false, message: "User does not exist" });
            }

            // check already member
            const exists = await Chatmember.findOne({ where: { chatId, userId } });
            if (exists) {
                return res.status(400).json({ success: false, message: "User already in chat" });
            }

            await Chatmember.create({ chatId, userId });
            res.json({ success: true, message: "Member added" });

        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };


    const removeMember = async (req, res) => {
        try {
            const { chatId, userId } = req.body


            // check chat exists
            const chat = await Chat.findByPk(chatId);
            if (!chat) {
                return res.status(400).json({ success: false, message: "Chat does not exist" });
            }

            // check user exists
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(400).json({ success: false, message: "User does not exist" });
            }

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


