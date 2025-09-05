const { createLogger, format, transports, level, error } = require("winston")



const logger = createLogger({
    level: "info",
    format: format.combine(
        format.prettyPrint(),
        format.errors({ stack: true }),
        format.colorize(),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(({ level, message, timestamp }) => {
            return `[${timestamp} ${level.toUpperCase()} : ${message}]`
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "logs/error.log", level: "error" }),
        new transports.File({ filename: "logs/combine.log" })
    ]
})

module.exports = logger
