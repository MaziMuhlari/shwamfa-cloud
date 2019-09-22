const { Article } = require('../models/article');
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

    const article = await Article.findOne({}, {}, { sort: { 'dateCreated': -1 } });
    res.send(article);

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