const { User } = require("../models")


module.exports = () => {
    const getProfile = async (req, res) => {
        try {
            const userId = req.user.userid
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
    return {
        getProfile
    }
}