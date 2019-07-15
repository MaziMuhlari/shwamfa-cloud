const Joi = require('joi');
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    position: {
        type: String
    },
    imageUrl: {
        type: String
    },
    goalsScored: {
        type: Number
    },
    assists: {
        type: Number
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

const Player = mongoose.model('Player', playerSchema);

function validatePlayer(player) {
    const schema = {
        fullname: Joi.string().required(),
        position: Joi.string().required(),
        imageUrl: Joi.string().allow('').allow(null),
    };

    return Joi.validate(player, schema);
}

exports.playerSchema = playerSchema;
exports.Player = Player;
exports.validatePlayer = validatePlayer;