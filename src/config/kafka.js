const { Kafka } = require("kafkajs")
const { Json } = require("sequelize/lib/utils")
const { log } = require("winston")


const kafka = new Kafka({
    clientId: "whatsapp-clone",
    brokers: ["localhost:9092"]
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: "whatsapp-clone-messages" })

async function initKafka() {
    try {
        await producer.connect()
        console.log("kafka producer connected");
        await consumer.connect()
        console.log("kafka consumer connected");
        await consumer.subscribe({ topic: "messages", fromBeginning: true })

        consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`kafka Message [${topic}] -> ${message.value.toString()}`);

            }
        })

    } catch (error) {
        console.error("Kafka connection error:", error.message);

    }
}


async function sendToKafka(topic, data) {
    try {
        await producer.send({
            topic,
            messages: [{ value: JSON.stringify(data) }]
        })
        console.log("Message sent to data", data);

    } catch (error) {
        console.error("Kafka error message", error.message);

    }
}


module.exports = {
    initKafka, sendToKafka, producer, consumer
}


