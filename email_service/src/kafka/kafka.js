// This file is used as a kafka service for creating the topics

const {Kafka, ConfigResourceTypes} = require('kafkajs');

let admin;
let client;

const init = () => {
    client = new Kafka({
        clientId: 'kafka-manager',
        connectionTimeout: 5000,
        requestTimeout: 5000,
        brokers: ['kafka:9092'],
        retry: {
            retries: 1
        },
    });

    admin = client.admin();
};

const configureTopics = async (topics) => {
    if (!client) {
        init();
    }

    console.log({message: 'Configuring Kafka'});
    await admin.connect();

    let currentTopics = await admin.fetchTopicMetadata();
    currentTopics = currentTopics.topics.map(({name}) => name);

    console.log(currentTopics);

    const topicsToCreate = topics.filter(({topic}) => !currentTopics.includes(topic));
    if (topicsToCreate.length) {
        console.log({
            message: 'Creating topics',
            topics: topicsToCreate.map(({topic}) => topic)
        });
        await admin.createTopics({
            topics: topicsToCreate,
            waitForLeaders: true,
            timeout: 60000
        });
    }

    const configuredTopics = topics.filter(({configEntries}) => configEntries);
    if (configuredTopics.length) {
        const currentConfigs = await admin.describeConfigs({
            includeSynonyms: false,
            resources: configuredTopics.map(({topic, configEntries}) => ({
                type: ConfigResourceTypes.TOPIC,
                name: topic,
                configNames: configEntries.map(({name}) => name)
            }))
        });

        const resourcesToUpdate = [];
        for (const {resourceName, configEntries} of currentConfigs.resources) {
            const updatedConfigEntries = [];
            const configuredTopic = topics.find((it) => it.topic === resourceName);
            for (const {configName, configValue} of configEntries) {
                const config = configuredTopic.configEntries.find(({name}) => name === configName);
                if (config && config.value !== configValue) {
                    console.log({
                        message: 'Config update',
                        before: configValue,
                        after: config.value
                    });
                    updatedConfigEntries.push(config);
                }
            }

            if (updatedConfigEntries.length) {
                resourcesToUpdate.push({
                    type: ConfigResourceTypes.TOPIC,
                    name: resourceName,
                    configEntries: updatedConfigEntries
                });
            }
        }

        if (resourcesToUpdate.length) {
            await admin.alterConfigs({resources: resourcesToUpdate});
        }
    }

    await admin.disconnect();
    console.log({messages: 'Success'});
};

module.exports = {
    init,
    configureTopics
};
