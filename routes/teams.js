const { Team, validateTeam } = require('../models/team');
const auth = require('../middleware/authentication');
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
router.post('/', auth, async (req, res) => {

    const { error } = validateTeam(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let team = new Team(_.pick(req.body, ["emblemUrl", "name", "manager", "link"]));
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
router.get('/:teamId', auth, async (req, res) => {

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

    const teams = await Team.find({}, {}, { sort: { 'created_at' : -1 } });
    res.send(teams);

});

/**
 * @api {delete} /api/teams/1
 * @apiName DeleteTeamById
 * @apiGroup Teams
 * 
 * @apiDescription Delete a team by Id.
 */
router.delete('/:id', auth, async (req, res) => {

    const team = await Team.findByIdAndDelete(req.params.id);
    res.send(team);

});

module.exports = router;