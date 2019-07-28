const Joi = require('joi');
const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    imageUrl: {
        type: String
    },
    title: {
        type: String
    },
    sponsor: {
        type: String
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

const League = mongoose.model('League', leagueSchema);

function validateLeague(league) {
    const schema = {
        imageUrl: Joi.string().allow('').allow(null),
        title: Joi.string().required(),
        sponsor: Joi.string().required()
    };

    return Joi.validate(league, schema);
}

exports.leagueSchema = leagueSchema;
exports.League = League;
exports.validateLeague = validateLeague;