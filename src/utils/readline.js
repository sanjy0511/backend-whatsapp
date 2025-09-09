const readline = require("readline")
const { encrypt } = require("./encryption")


function startReadline(io) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    console.log("Type a message and Click the Enter.....")

    rl.on("line", (input) => {
        if (input.trim() === "") return null

        const { iv, encrptedData } = encrypt(input)
        io.emit("terminal_message", { iv, encrptedData })

        console.log(`Message Sent (encrypted) : ${encrptedData}`)
    })
}


module.exports = { startReadline }