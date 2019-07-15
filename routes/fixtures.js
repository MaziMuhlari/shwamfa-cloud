const { Fixture, validateFixture } = require('../models/fixture');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

/**
 * @api {post} /api/fixtures
 * @apiName CreateFixture
 * @apiGroup Fixtures
 * 
 * @apiDescription Publish a news fixture.
 */
router.post('/', async (req, res) => {

    const { error } = validateFixture(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let fixture = new Fixture(_.pick(req.body, ['homeTeamUrl', 'homeTeam', 'awayTeamUrl', 'awayTeam', 'league', 'channel', 'homeScore', 'awayScore','kickOff']));
    await fixture.save();

    res.send(fixture);

});

/**
 * @api {get} /api/fixtures/1
 * @apiName GetFixtureById
 * @apiGroup Fixtures
 * 
 * @apiDescription Get a published fixture by Id.
 */
router.get('/:fixtureId', async (req, res) => {

    const fixture = await Fixture.findById(req.params.fixtureId);
    res.send(fixture);

});

/**
 * @api {get} /api/fixtures
 * @apiName GetFixtures
 * @apiGroup Fixtures
 * 
 * @apiDescription Get all published fixtures.
 */
router.get('/', async (req, res) => {

    const fixtures = await Fixture.find();
    res.send(fixtures);
    
});

module.exports = router;