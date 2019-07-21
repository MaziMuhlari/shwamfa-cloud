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

    await Team.find()
        .sort({ 'points': -1, 'goalDifference': -1 })
        .exec(function (e, docs) {

            let teams = [];

            if (docs && docs.length > 0) {
                let position = 1;
                docs.forEach(element => {
                    teams.push({
                        gamesWon: element.gamesWon,
                        gamesDrawn: element.gamesDrawn,
                        gamesLost: element.gamesLost,
                        goalsScored: element.goalsScored,
                        goalsConceided: element.goalsConceided,
                        dateCreated: element.dateCreated,
                        lastUpdated: element.lastUpdated,
                        _id: element._id,
                        emblemUrl: element.emblemUrl,
                        name: element.name,
                        __v: element.__v,
                        gamesPlayed: element.gamesPlayed,
                        goalDifference: element.goalDifference,
                        points: element.points,
                        id: element.id,
                        position: position
                    });
                    position++;
                });
            }

            res.send(teams);

        });

});

module.exports = router;