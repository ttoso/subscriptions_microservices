const { Kafka, ConfigResourceTypes } = require('kafkajs');

let client;

const init = () => {
    client = new Kafka({
        clientId: 'kafka-manager',
        connectionTimeout: 5000,
        requestTimeout: 5000,
        brokers: ['kafka:9092'],
        retry: {
            retries: 0
        }
    });

};

const consumeEvents = async (topic, onMessageReceived) => {
    if (!client) {
        init();
    }

    const consumer = client.consumer({groupId: 'email'})

    await consumer.connect();
    await consumer.subscribe({topic});
    await consumer.run({
        eachMessage: async ({message}) => {
            onMessageReceived(message.value.toString());
        },
    })
}

module.exports = {
    init,
    consumeEvents
};