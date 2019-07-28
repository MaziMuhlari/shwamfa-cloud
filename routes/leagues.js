const { League, validateLeague } = require('../models/league');
const auth = require('../middleware/authentication');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

/**
 * @api {post} /api/leagues
 * @apiName CreateLeague
 * @apiGroup Leagues
 * 
 * @apiDescription Publish a news league.
 */
router.post('/', auth, async (req, res) => {

    const { error } = validateLeague(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let league = new League(_.pick(req.body, ['imageUrl', 'title', 'sponsor']));
    await league.save();

    res.send(league);

});

/**
 * @api {get} /api/leagues/1
 * @apiName GetLeagueById
 * @apiGroup Leagues
 * 
 * @apiDescription Get a published league by Id.
 */
router.get('/:leagueId', auth, async (req, res) => {

    const league = await League.findById(req.params.leagueId);
    res.send(league);

});

/**
 * @api {get} /api/leagues
 * @apiName GetLeagues
 * @apiGroup Leagues
 * 
 * @apiDescription Get all published leagues.
 */
router.get('/', auth, async (req, res) => {

    const leagues = await League.find({}, {}, { sort: { 'created_at' : -1 } });
    res.send(leagues);

});

/**
 * @api {get} /api/league/1
 * @apiName DeleteLeagueById
 * @apiGroup Leagues
 * 
 * @apiDescription Delete a league by Id.
 */
router.get('/:id', auth, async (req, res) => {

    const league = await League.findByIdAndDelete(req.params.id);
    res.send(league);

});

module.exports = router;