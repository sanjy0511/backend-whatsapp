const readline = require("readline");
const { encrypt } = require("./encryption");
const EventEmitter = require("events")


const emitter = new EventEmitter()
function startReadline(io) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log(" Usage: chatId:senderId:message");
    console.log("Type your message and press Enter...");

    rl.on("line", (input) => {
        if (input.trim() === "") return;

        // Format: chatId:senderId:message
        const parts = input.split(":");
        if (parts.length < 3) {
            console.log("Format must be chatId:senderId:message");
            return;
        }

        const [chatId, senderId, ...msgParts] = parts;
        const message = msgParts.join(":").toString();

        emitter.emit("message", { chatId, senderId, message })

        const { iv, encryptedData } = encrypt(message);

        // Emit to specific chat room
        io.to(chatId.toString()).emit("terminal_message", {
            chatId: Number(chatId),
            senderId: Number(senderId),
            iv,
            encryptedData,
        });

        console.log(` Sent → Chat ${chatId}, User ${senderId}: ${message}`);
    });
}

function onMessage(callback) {
    emitter.on("message", callback)
}

module.exports = { startReadline, onMessage };
