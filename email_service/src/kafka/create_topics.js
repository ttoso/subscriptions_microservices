// This script is for creating the topics in the local kafka instance

const fs = require('fs').promises;
const { configureTopics } = require('./kafka');

const readFile = async (filePath) => {
    let body = (await fs.readFile(filePath)).toString();
    if (filePath.endsWith('.json')) {
        body = JSON.parse(body);
    }
    return body;
};

const main = async () => {
    const topics = await readFile(`${__dirname}/topics.json`);
    await configureTopics(topics);
};

if (!module.parent) {
    (async () => {
        await main().catch((error) => {
            process.exit(1);
        });
    })();
}

module.exports = main;