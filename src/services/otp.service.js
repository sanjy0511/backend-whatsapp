const otpGenerator = require("otp-generator")





const generateOtpCode = () => {
    return otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    })
}

module.exports = {

    generateOtpCode

}