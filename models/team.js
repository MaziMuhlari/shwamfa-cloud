const Joi = require('joi');
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
    {
        emblemUrl: {
            type: String
        },
        name: {
            type: String
        },
        gamesWon: {
            type: Number,
            default: 0
        },
        gamesDrawn: {
            type: Number,
            default: 0
        },
        gamesLost: {
            type: Number,
            default: 0
        },
        goalsScored: {
            type: Number,
            default: 0
        },
        goalsConceided: {
            type: Number,
            default: 0
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

teamSchema.virtual('gamesPlayed').get(function () {
    return this.gamesLost + this.gamesDrawn + this.gamesWon;
});

teamSchema.virtual('goalDifference').get(function () {
    return this.goalsScored - this.goalsConceided;
});

teamSchema.virtual('points').get(function () {
    var wonPoints = this.gamesWon * 3;
    return wonPoints + this.gamesDrawn;
});


const Team = mongoose.model('Team', teamSchema);

function validateTeam(team) {
    const schema = {
        emblemUrl: Joi.string().required(),
        name: Joi.string().required(),
        gamesWon: Joi.number().required(),
        gamesDrawn: Joi.number().required(),
        gamesLost: Joi.number().required(),
        goalsScored: Joi.number().required(),
        goalsConceided: Joi.number().required()

    };

    return Joi.validate(team, schema);
}

exports.teamSchema = teamSchema;
exports.Team = Team;
exports.validateTeam = validateTeam;