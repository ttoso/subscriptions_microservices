
const subscriptionData = require('../data/subscriptions');

const SubscriptionsService = {

    getSubscriptions: async () => {
        try {
            return await subscriptionData.getSubscriptions();
        } catch (error) {
            throw error;
        }
    },

    getSubscriptionById: async (subscriptionId)  => {
        try {
            return await subscriptionData.getSubscriptionById(subscriptionId);
        } catch (error) {
            throw error;
        }
    },

    createSubscription: async (subscription)  => {
        try {
            return await subscriptionData.createSubscription(subscription);
            console.log('Subscription created');
        } catch (error) {
            throw error;
        }
    },

    deleteSubscriptionById: async (subscriptionId)  => {
        try {
            return await subscriptionData.deleteSubscriptionById(subscriptionId);
            console.log('Subscription deleted');
        } catch (error) {
            throw error;
        }
    },
};

module.exports = SubscriptionsService;