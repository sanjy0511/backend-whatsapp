const { Otp, User } = require("../models")
const otpGenerator = require("otp-generator")
const bcrypt = require('bcrypt');
const { sendSmsOtp } = require("./twilio.service");




const generateOtpCode = () => {
    return otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    })
}



// const requestOtpforPhone = async (phone) => {
//     const code = generateOtpCode()
//     const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
//     await Otp.create({ phone, code, expiresAt, verified: false })
//     await sendSmsOtp(phone, code)
//     return code
// }


// const verifyOtpcode = async (phone, code) => {
//     const OtpRecord = await Otp.findOne({ where: { phone, code, verified: false } })
//     if (!OtpRecord) return null
//     OtpRecord.verified = true
//     await OtpRecord.save()
//     if (OtpRecord.expiresAt < new Date()) return null



//     let user = await User.findOne({ where: { phone, name: "New User" } })
//     if (!user) {
//         user = await User.create({
//             phone,
//             name: "New User"
//         })
//     }
//     return user
// }


module.exports = {
    // requestOtpforPhone,
    // verifyOtpcode
    generateOtpCode

}