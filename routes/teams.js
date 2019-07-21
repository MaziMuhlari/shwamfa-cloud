const { Team, validateTeam } = require('../models/team');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

/**
 * @api {post} /api/teams
 * @apiName CreateTeam
 * @apiGroup Teams
 * 
 * @apiDescription Publish a news team.
 */
router.post('/', async (req, res) => {

    const { error } = validateTeam(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let team = new Team(_.pick(req.body, ["emblemUrl", "name", "league", "gamesWon", "gamesDrawn", "gamesLost", "goalsScored", "goalsConceided"]));
    await team.save();

    res.send(team);

});

/**
 * @api {get} /api/teams/1
 * @apiName GetTeamById
 * @apiGroup Teams
 * 
 * @apiDescription Get a published team by Id.
 */
router.get('/:teamId', async (req, res) => {

    const team = await Team.findById(req.params.teamId);
    res.send(team);

});

/**
 * @api {get} /api/teams
 * @apiName GetTeams
 * @apiGroup Teams
 * 
 * @apiDescription Get all published teams.
 */
router.get('/', async (req, res) => {

    const teams = await Team.find().sort({ 'league': -1, 'points': -1, 'goalDifference': -1 });

    var position = 1;
    var league;
    var positioned = [];
    teams.forEach(team => {

        if (league != team.league)
            position = 1;

        positioned.push({
            position: position,
            gamesWon: team.gamesWon,
            gamesDrawn: team.gamesDrawn,
            gamesLost: team.gamesLost,
            goalsScored: team.goalsScored,
            goalsConceided: team.goalsConceided,
            league: team.league,
            dateCreated: team.dateCreated,
            lastUpdated: team.lastUpdated,
            _id: team._id,
            emblemUrl: team.emblemUrl,
            name: team.name,
            __v: team.__v,
            gamesPlayed: team.gamesPlayed,
            goalDifference: team.goalDifference,
            points: team.points,
            id: team.id
        });

        position++;
    });

    res.send(positioned);

});

module.exports = router;