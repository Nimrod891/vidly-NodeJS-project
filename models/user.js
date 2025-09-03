const mongoose =require("mongoose")
const Joi = require("joi")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        maxlength: 255,
        minlength: 5
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
        maxlength: 1024
    }
})

const User = mongoose.model("User", userSchema)

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().unique().max(255).min(5).required(),
        password: Joi.string().min(8).max(255).required()
    }

    return Joi.validate(user, schema)
}

exports.User=User
exports.validate=validateUser
exports.userSchema=userSchema

