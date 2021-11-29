const { Kafka, ConfigResourceTypes } = require('kafkajs');

let client;
let producer;

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

    producer = client.producer();
};

const produceEvent = async (topic, message) => {
    if (!client) {
        init();
    }

    messages = [{value: JSON.stringify(message)}]
    await producer.connect();
    await producer.send({
        topic,
        messages,
        acks: 1
    });
};

module.exports = {
    init,
    produceEvent
};