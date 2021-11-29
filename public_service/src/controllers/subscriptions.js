const express = require('express');
const Joi = require('joi');
const router =  express.Router();

const auth = require('../middleware/auth');
const subscriptionService = require('../services/subscriptions')

// Get subscriptions
router.get('/', auth, async (request, response) => {
    try {
        const subscriptions = await subscriptionService.getSubscriptions();
        response.json(subscriptions);
    } catch (error) {
        console.log(error);
        response.status(error.statusCode);
        response.send(error.message);
    }
});

// Get subscription by id
router.get('/:subscriptionId', auth, async (request, response) => {
    try {
        const subscriptionId = request.params.subscriptionId;
        const subscription = await subscriptionService.getSubscriptionById(subscriptionId);
        response.json(subscription);
    } catch (error) {
        console.log(error);
        response.status(error.statusCode);
        response.send(error.message);
    }
});

// Post subscription
router.post('/', auth, async (request, response) => {
    const subscription = request.body;
    const subscriptionSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        firstname: Joi.string(),
        gender: Joi.string(),
        date_of_birth: Joi.date().required(),
        consent: Joi.boolean().required(),
        newsletter_id: Joi.number().required()
    });

    const {error} = subscriptionSchema.validate(subscription);
    if (error == null) {
        try {
            const createdSubscription = await subscriptionService.createSubscription(subscription);
            response.status(201);
            response.send(createdSubscription);
        } catch (error) {
            console.log(error);
            response.status(error.statusCode);
            response.send(error.message);
        }

    } else {
        response.status(405);
        response.send(error.details);
    }
});

// Delete existing subscription by id
router.delete('/:subscriptionId', auth, async (request, response) => {
    try {
        const subscriptionId = request.params.subscriptionId;
        const deletedSubscription = await subscriptionService.deleteSubscriptionById(subscriptionId);
        response.status(200);
        response.send(deletedSubscription);
    } catch (error) {
        console.log(error);
        response.status(error.statusCode);
        response.send(error.message);
    }
});

module.exports = router;