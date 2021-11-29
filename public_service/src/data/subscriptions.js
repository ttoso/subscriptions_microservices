const axios = require('axios');

const config = require('../../config')

const SubscriptionsData = {

    getSubscriptions: async () => {
        try {
            const response = await axios.get(config.subscription_service_url + 'subscriptions');
            return response.data;
        } catch (e) {
            const error = new Error('Error connecting internal api');
            error.statusCode = 500
            throw error;
        }
    },

    getSubscriptionById: async (subscriptionId)  => {
        try {
            const response = await axios.get(config.subscription_service_url + 'subscriptions/' + subscriptionId);
            return response.data;
        } catch (e) {
            if (e.statusCode) throw e;
            console.log('HHHHHH', e.response.status)
            const error = new Error(e.response.statusText);
            error.statusCode = e.response.status;
            throw error;
        }
    },

    createSubscription: async (subscription)  => {
        try {
            const response = await axios.post(config.subscription_service_url + 'subscriptions/', subscription);
            return response.data;
        } catch (e) {
            const error = new Error('Error connecting internal api');
            error.statusCode = 500
            throw error;
        }
    },

    deleteSubscriptionById: async (subscriptionId)  => {
        try {
            const response = await axios.delete(config.subscription_service_url + 'subscriptions/' + subscriptionId);
            return response.data;
        } catch (e) {
            const error = new Error('Error connecting internal api');
            error.statusCode = 500
            throw error;
        }
    },
}

module.exports = SubscriptionsData;