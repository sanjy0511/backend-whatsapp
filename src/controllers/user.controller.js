const bcrypt = require("bcrypt")
const { registerUser } = require("../services/user.service")
const { generateToken } = require("../middleware/auth.token")




module.exports = () => {

    // const register = async (req, res) => {
    //     try {
    //         const userData = req.body
    //         const user = await registerUser(userData)
    //         res.status(201).json({
    //             success: true,
    //             message: "New user created"
    //         })
    //     } catch (error) {
    //         res.status(500).json({
    //             success: false,
    //             message: error.message
    //         })
    //     }
    // }

    // const login = async (req, res) => {
    //     try {
    //         const { identifier, password } = req.body
    //         const user = await User.findOne({ where: { [require("sequelize").Op.or]: [{ email: identifier }, { phone: identifier }] } })
    //         if (!user) return res.status(404).json({ message: "User not found" })
    //         let findpassword = await bcrypt.compare(password, user.password)
    //         if (!findpassword) return res.status(404).json({ message: "Incorrect password" })
    //         const token = await generateToken(user.id)
    //         res.json({ token })
    //     } catch (error) {
    //         res.status(500).json({ success: false, error: error.message })
    //     }
    // }





    return {
        // register,
        // login
    }

}
