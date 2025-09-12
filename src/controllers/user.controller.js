const { User, BlockedUser } = require("../models")


module.exports = () => {
    const getProfile = async (req, res) => {
        try {
            const userId = req.user.id
            console.log(userId)
            const user = await User.findByPk(userId, { attributes: ["id", "name", "avatar", "about", "lastSeen"] })
            if (!user) return res.status(404).json({ message: "User not Found" })
            res.json({
                success: true,
                user
            })
        } catch (error) {
            res.json({
                success: false,
                Error: error.message
            })
        }
    }

    const updateProfile = async (req, res) => {
        try {
            const userId = req.user.id
            const { name, avatar, about } = req.body
            const user = await User.findByPk(userId)
            if (!user) return res.status(404).json({ message: "User not found" })
            await user.update({ name, avatar, about })
            res.json({
                success: true,
                user
            })
        } catch (error) {
            res.status(500).json({ success: false, Error: error.message })
        }
    }


    const blockedUser = async (req, res) => {
        try {
            const ownerUserId = req.user.id
            const { blockedUserId } = req.body
            if (!blockedUserId) return res.status(404).json({ message: "Blockuserid is required" })
            if (ownerUserId === blockedUserId) return res.status(404).json({ message: "self block not available" })
            const [blocked, created] = await BlockedUser.findOrCreate(
                { where: { ownerUserId, blockedUserId } })
            res.json({
                success: true,
                blocked
            })
        } catch (error) {
            res.json({
                success: false,
                Error: error.message
            })
        }
    }

    const unblockUser = async (req, res) => {
        try {
            const ownerUserId = req.user.id
            const { blockedUserId } = req.body

            const record = await BlockedUser.findOne({ where: { ownerUserId, blockedUserId } })
            if (!record) return res.status(404).json({ message: "Blocked user not found" })
            await record.destroy()
            res.json({
                success: true,
                message: "User unblocked"
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    const listBlockedUsers = async (req, res) => {
        try {
            const ownerUserId = req.user.id
            const blockUsers = await BlockedUser.findAll({
                where: { ownerUserId }, include: [{ model: User, as: "blockUser", attributes: ["id", "phone", "name", "avatar"] }]
            })
            res.json({
                success: true,
                blockUsers
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }


    return {
        getProfile,
        updateProfile,
        blockedUser,
        unblockUser,
        listBlockedUsers
    }
}