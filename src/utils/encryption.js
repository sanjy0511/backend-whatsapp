const crypto = require("crypto")



const SECRET_KEY = "12345678901234567890123456789012"
const ALGORITHM = "aes-256-cbc"


function encrypt(text) {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv)
    let encrypted = cipher.update(text, "utf-8", "hex")
    encrypted += cipher.final("hex")
    return {
        iv: iv.toString("hex"),
        encryptedData: encrypt
    }
}



function decrypt(encryptData, ivHex) {
    const iv = Buffer.from(ivHex, "hex")
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv)
    let decrypted = decipher.update(encryptData, "hex", "utf-8")
    decrypted += decipher.final("utf-8")
    return decrypted
}

module.exports = {
    encrypt, decrypt
}