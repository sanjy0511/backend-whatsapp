const { generateToken } = require("../middleware/auth.token")
const { User } = require("../models")
const { generateOtpCode } = require("../services/otp.service")
const { sendSmsOtp } = require("../services/twilio.service")

const OtpStore = {}



module.exports = (logger) => {
    const userRegister = async (req, res) => {
        try {
            const { phone } = req.body
            if (!phone) return res.status(404).json({ message: "Phone number is required" })
            const otp = generateOtpCode()
            OtpStore[phone] = { otp }
            await sendSmsOtp(phone, otp)
            res.json({ success: true, otp, message: "Otp send to Mobile" })
        } catch (error) {
            res.status(500).json({ Error: error.message })
        }
    }

    const Login = async (req, res) => {
        try {
            const { phone, otp } = req.body
            if (!phone || !otp) return res.status(404).json({ message: "Phone and Otp required" })

            const record = OtpStore[phone]
            console.log(OtpStore);

            if (!record) return res.status(404).json({ message: "Otp not generated" })
            // if (record.expires < Date.now()) return res.status(404).json({ message: "Otp Expired" })
            if (record.otp !== otp) return res.status(404).json({ message: "Invaild Otp" })

            let user = await User.findOne({ where: { phone } })
            if (!user) {
                user = await User.create({ phone })
            }
            const token = await generateToken(user.id)
            // delete OtpStore[phone]
            res.json({ token })
        } catch (error) {
            res.status(500).json({
                success: false,
                Error: error.message
            })
        }
    }


    return {
        userRegister,
        Login

    }

}