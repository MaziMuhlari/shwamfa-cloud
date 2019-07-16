const Joi = require('joi');
const mongoose = require('mongoose');

const fixtureSchema = new mongoose.Schema(
    {
        homeTeamUrl: {
            type: String
        },
        homeTeam: {
            type: String
        },
        awayTeamUrl: {
            type: String
        },
        awayTeam: {
            type: String
        },
        league: {
            type: String
        },
        channel: {
            type: String
        },
        homeScore: {
            type: Number
        },
        awayScore: {
            type: Number
        },
        kickOff: {
            type: Date
        },
        dateCreated: {
            type: Date,
            default: new Date()
        },
        lastUpdated: {
            type: Date,
            default: new Date()
        }
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

fixtureSchema.virtual('matchMonth').get(function () {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[this.kickOff.getMonth()] + " " + this.kickOff.getFullYear();
});

const Fixture = mongoose.model('Fixture', fixtureSchema);

function validateFixture(fixture) {
    const schema = {
        homeTeamUrl: Joi.string().required(),
        homeTeam: Joi.string().required(),
        awayTeamUrl: Joi.string().required(),
        awayTeam: Joi.string().required(),
        league: Joi.string().required(),
        channel: Joi.string().required(),
        homeScore: Joi.number().allow('').allow(null),
        awayScore: Joi.number().allow('').allow(null),
        kickOff: Joi.date().required()
    };

    return Joi.validate(fixture, schema);
}

exports.fixtureSchema = fixtureSchema;
exports.Fixture = Fixture;
exports.validateFixture = validateFixture;