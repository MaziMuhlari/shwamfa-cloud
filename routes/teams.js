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

    let team = new Team(_.pick(req.body, ["emblemUrl", "name", "manager", "link", "firstGameweek"]));
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

    const teams = await Team.find();
    let ranked = _.orderBy(teams, ['points'], ['desc']);

    var position = 1;
    var positioned = [];

    ranked.forEach(team => {

        positioned.push({
            _id: team._id,
            id: team.id,
            __v: team.__v,
            position: position,
            points: team.points,
            matches: team.matches,
            emblemUrl: team.emblemUrl,
            name: team.name,
            manager: team.manager,
            link: team.link,

            gameweek1: team.gameweek1,
            gameweek2: team.gameweek2,
            gameweek3: team.gameweek3,
            gameweek4: team.gameweek4,
            gameweek5: team.gameweek5,
            gameweek6: team.gameweek6,
            gameweek7: team.gameweek7,
            gameweek8: team.gameweek8,
            gameweek9: team.gameweek9,
            gameweek10: team.gameweek10,
            gameweek11: team.gameweek11,
            gameweek12: team.gameweek12,
            gameweek13: team.gameweek13,
            gameweek14: team.gameweek14,
            gameweek15: team.gameweek15,
            gameweek16: team.gameweek16,
            gameweek17: team.gameweek17,
            gameweek18: team.gameweek18,
            gameweek19: team.gameweek19,
            gameweek20: team.gameweek20,
            gameweek21: team.gameweek21,
            gameweek22: team.gameweek22,
            gameweek23: team.gameweek23,
            gameweek24: team.gameweek24,
            gameweek25: team.gameweek25,
            gameweek26: team.gameweek26,
            gameweek27: team.gameweek27,
            gameweek28: team.gameweek28,
            gameweek29: team.gameweek29,
            gameweek30: team.gameweek30,
            gameweek31: team.gameweek31,
            gameweek32: team.gameweek32,
            gameweek33: team.gameweek33,
            gameweek34: team.gameweek34,
            gameweek35: team.gameweek35,
            gameweek36: team.gameweek36,
            gameweek37: team.gameweek37,
            gameweek38: team.gameweek38,

            firstGameweek: team.firstGameweek,
            dateCreated: team.dateCreated,
            lastUpdated: team.lastUpdated,
            user: team.user
        });

        position++;

    });

    res.send(positioned);

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