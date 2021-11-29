const kafka = require('../services/kafka');
const emailService = require('../services/emails');

const onMessageReceived = async (message) => {
    let messageAsJSON;
    try {
        messageAsJSON = JSON.parse(message);
    } catch (err) {
        console.log(`Unable to parse JSON ${message}`);
        return;
    }

    const { email } = messageAsJSON;

    emailService.sendEmail(email);
};


const EmailController = {
    waitForEmail: () => {
        kafka.consumeEvents('email_service', onMessageReceived);
    }
}

module.exports = EmailController;