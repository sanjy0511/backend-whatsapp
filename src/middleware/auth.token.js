const jwt = require("jsonwebtoken")



const key = process.env.TOKEN_KEY




const generateToken = async (id) => {
    return jwt.sign({ id }, key, { expiresIn: "7d" })
}

const verifytoken = async (req, res, next) => {
    const authHeaders = req.headers["authorization"]
    const token = authHeaders && authHeaders.split(" ")[1]
    if (!token) return res.status(401).json({ message: "No Token Include" })


    jwt.verify(token, key, (err, decoded) => {
        if (err) return res.status(404).json({ message: "Token has Expired" })
        req.user = decoded
        next()
    })
}

module.exports = {
    generateToken,
    verifytoken,
}

