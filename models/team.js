const Joi = require('joi');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema(
    {
        emblemUrl: {
            type: String
        },
        name: {
            type: String
        },
        manager: {
            type: String
        },
        link: {
            type: String
        },
        gameweek1: {
            type: Number,
            default: 0
        },
        gameweek2: {
            type: Number,
            default: 0
        },
        gameweek3: {
            type: Number,
            default: 0
        },
        gameweek4: {
            type: Number,
            default: 0
        },
        gameweek5: {
            type: Number,
            default: 0
        },
        gameweek6: {
            type: Number,
            default: 0
        },
        gameweek7: {
            type: Number,
            default: 0
        },
        gameweek8: {
            type: Number,
            default: 0
        },
        gameweek9: {
            type: Number,
            default: 0
        },
        gameweek10: {
            type: Number,
            default: 0
        },
        gameweek11: {
            type: Number,
            default: 0
        },
        gameweek12: {
            type: Number,
            default: 0
        },
        gameweek13: {
            type: Number,
            default: 0
        },
        gameweek14: {
            type: Number,
            default: 0
        },
        gameweek15: {
            type: Number,
            default: 0
        },
        gameweek16: {
            type: Number,
            default: 0
        },
        gameweek17: {
            type: Number,
            default: 0
        },
        gameweek18: {
            type: Number,
            default: 0
        },
        gameweek19: {
            type: Number,
            default: 0
        },
        gameweek20: {
            type: Number,
            default: 0
        },
        gameweek21: {
            type: Number,
            default: 0
        },
        gameweek22: {
            type: Number,
            default: 0
        },
        gameweek23: {
            type: Number,
            default: 0
        },
        gameweek24: {
            type: Number,
            default: 0
        },
        gameweek25: {
            type: Number,
            default: 0
        },
        gameweek26: {
            type: Number,
            default: 0
        },
        gameweek27: {
            type: Number,
            default: 0
        },
        gameweek28: {
            type: Number,
            default: 0
        },
        gameweek29: {
            type: Number,
            default: 0
        },
        gameweek30: {
            type: Number,
            default: 0
        },
        gameweek31: {
            type: Number,
            default: 0
        },
        gameweek32: {
            type: Number,
            default: 0
        },
        gameweek33: {
            type: Number,
            default: 0
        },
        gameweek34: {
            type: Number,
            default: 0
        },
        gameweek35: {
            type: Number,
            default: 0
        },
        gameweek36: {
            type: Number,
            default: 0
        },
        gameweek37: {
            type: Number,
            default: 0
        },
        gameweek38: {
            type: Number,
            default: 0
        },
        firstGameweek: {
            type: Number,
            default: 1
        },
        dateCreated: {
            type: Date,
            default: new Date()
        },
        lastUpdated: {
            type: Date,
            default: new Date()
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
);

const Team = mongoose.model('Team', teamSchema);

function validateTeam(team) {
    const schema = {
        emblemUrl: Joi.string().required(),
        name: Joi.string().required(),
        manager: Joi.string().required(),
        link: Joi.string().required(),
        firstGameweek: Joi.number().required()
    };

    return Joi.validate(team, schema);
}

exports.teamSchema = teamSchema;
exports.Team = Team;
exports.validateTeam = validateTeam;