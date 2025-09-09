const { User, BlockedUser, Contact } = require("../models")


module.exports = () => {

    const addContact = async (req, res) => {
        try {
            const { } = req.body
            const userId = req.user.id

            const existingUser = await User.findOne({ where: { phone } })
            if (!existingUser) return res.status(404).json({ message: "User not found with this phone" })

            const isBlocked = await BlockedUser.findOne({
                where: { ownerUserId: existingUser.id, blockedUserId: userId }
            })
            if (isBlocked) return res.status(404).json({ message: "You are blocked by this user" })
            const contact = await Contact.create({
                ownerId: userId,
                contactId: existingUser.id,
                name
            })
            res.json({
                success: true,
                contact
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }


    const getContacts = async (req, res) => {
        try {
            const userId = req.user.id
            const contacts = await Contact.findAll({
                where: { ownerId: userId },
                include: [{ model: User, as: "contactUser", attributes: ["id", "phone", "name"] }]
            })
            res.json({
                success: true,
                contacts
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }


    return {
        addContact,
        getContacts
    }

}

