const bcrypt = require("bcrypt")
const { User } = require("../models")


const registerUser = async ({ name, email, phone, password }) => {
    if (!password) throw new Error("Password is Required")
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({
        name,
        email,
        phone,
        password: hash
    })
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,

    }
}


module.exports = {
    registerUser
}