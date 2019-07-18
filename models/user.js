const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    surname: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    cellphone: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    favourite: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    rating: {
        type: Number,
        default: 5
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    lastUpdated: {
        type: Date,
        default: new Date()
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateJoin(user) {
    const schema = {
        name: Joi.string().min(1).max(50).required(),
        surname: Joi.string().min(1).max(50).required(),
        cellphone: Joi.string().min(8).max(255).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        favourite: Joi.string().min(3).max(255).required()
    };

    return Joi.validate(user, schema);
}

function validateLogin(req) {
    const schema = {
        cellphone: Joi.string().min(8).max(255).required(),
        password: Joi.string().min(5).max(1024).required(),
    };

    return Joi.validate(req, schema);
}

exports.User = User;
exports.validateJoin = validateJoin;
exports.validateLogin = validateLogin;