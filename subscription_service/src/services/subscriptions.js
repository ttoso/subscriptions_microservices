const Subscription = require('../models/subscription');
const kafka = require('./kafka');

const SubscriptionsService = {

    getSubscriptions: async () => {
        try {
            const subscriptions = await Subscription.find();
            return subscriptions;
        } catch (e) {
            const error = new Error('Error connecting DB');
            error.statusCode = 500
            throw error;
        }
    },

    getSubscriptionById: async (subscriptionId)  => {
        try {
            const subscriptionExist = await Subscription.exists({ _id: subscriptionId });
            if (!subscriptionExist) {
                const error = new Error('Resource not found');
                error.statusCode = 404;
                throw error;
            };
            const subscription = await Subscription.findById(subscriptionId);
            return subscription;
        } catch (e) {
            if (e.statusCode) throw e;
            const error = new Error('Error connecting DB');
            error.statusCode = 500;
            throw error;
        }
    },

    createSubscription: async (subscription)  => {
        newSubscription = new Subscription(subscription);

        try {
            const savedSubscription = await newSubscription.save();
            kafka.produceEvent('email_service', subscription);
            return savedSubscription;
        } catch (e) {
            const error = new Error('Error connecting DB');
            error.statusCode = 500;
            throw error;
        }
    },

    deleteSubscriptionById: async (subscriptionId)  => {
        try {
            const savedSubscription = await Subscription.findByIdAndDelete(subscriptionId);
            return savedSubscription;
        } catch (e) {
            const error = new Error('Error connecting DB');
            error.statusCode = 500;
            throw error;
        }
    },
};

module.exports = SubscriptionsService;