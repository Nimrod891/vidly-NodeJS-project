const Joi = require('joi')
const mongoose = require("mongoose")
Joi.objectId = require('joi-objectid')(Joi)

const Rental = mongoose.model("Rental", new mongoose.Schema({
    customer: {
        // We don't reuse the customer schema as it could be giant. only properties we need.
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxLength: 50,
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 25
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));


function validateRental(rental) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };
    return Joi.validate(rental, schema);
}

    exports.Rental=Rental;
    exports.validate=validateRental;