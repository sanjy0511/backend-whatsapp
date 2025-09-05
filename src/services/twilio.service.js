const twilio = require("twilio")


const client = twilio(process.env.TWILO_SID, process.env.TWILO_AUTH_TOKEN)

const sendSmsOtp = async (phone, code) => {
    return client.messages.create({
        body: `your whatsapp login otp ${code}`,
        from: process.env.TWILO_PHONE_NUMBER,
        to: phone
    })
}

module.exports = {
    sendSmsOtp
}