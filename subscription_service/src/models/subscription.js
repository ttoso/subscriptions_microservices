const mongoose = require('mongoose');

//Model that defines the structure of a post and will create the instance to comunicate with DB
const SubscriptionSchema = mongoose.Schema({
    __id: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    date_of_birth: {
        type: Date
    },
    consent: {
        type: Boolean,
        required: true
    },
    newsletter_id: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
