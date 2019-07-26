const { Article } = require('../models/article');
const { Fixture } = require('../models/fixture');
const { Player } = require('../models/player');
const { Team } = require('../models/team');
const auth = require('../middleware/authentication');
const express = require('express');
const router = express.Router();


/**
 * @api {get} /api/reports/articles/latest
 * @apiName GetLatestArticle
 * @apiGroup Article
 * 
 * @apiDescription Get the latest published article.
 */
router.get('/articles/latest', auth, async (req, res) => {

    const article = await Article.findOne({}, {}, { sort: { 'created_at': -1 } });
    res.send(article);

});

/**
 * @api {get} /api/reports/fixtures/latest
 * @apiName GetLatestFixture
 * @apiGroup Fixture
 * 
 * @apiDescription Get the latest played fixture.
 */
router.get('/fixtures/latest', auth, async (req, res) => {

    var now = new Date();
    now.setDate(now.getDate() + 1);

    const fixture = await Fixture
        .findOne()
        .sort('-kickOff')
        .where('kickOff').lt(now);

    res.send(fixture);

});

/**
 * @api {get} /api/reports/players/scorers/top
 * @apiName GetTopPlayerScorer
 * @apiGroup Player
 * 
 * @apiDescription Get the top scorer.
 */
router.get('/players/scorers/top', auth, async (req, res) => {

    const player = await Player
        .findOne()
        .sort('-goalsScored');

    res.send(player);

});

/**
 * @api {get} /api/reports/teams/standings/current
 * @apiName GetCurrentTeamStanding
 * @apiGroup Team
 * 
 * @apiDescription Get the current standing of the team
 */
router.get('/teams/standings/current', auth, async (req, res) => {

    const teams = await Team
        .findOne({ 'name': 'Black Leopards' });

    res.send(teams);

});


module.exports = router;