const mongoose = require('mongoose');


// Creating our Events Schema below
const eventsSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    type: {
        type: String
    },
    location: {
        type: String, 
        required: true
    },
    date: {
        type: String, 
        required: true
    },
    time: {
        type: String
    },
    price: {
        type: String
    },
    link: {
        type: String
    },
    comments: {
        type: String
    },
    image: {
        type: String
    },
    occurred: {
        type: Boolean
    }
})

//Creating and exporting the model
const Events = mongoose.model('Events', eventsSchema)

module.exports = Events;