const { Player, validatePlayer } = require('../models/player');
const auth = require('../middleware/authentication');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

/**
 * @api {post} /api/players
 * @apiName CreatePlayer
 * @apiGroup Players
 * 
 * @apiDescription Publish a news player.
 */
router.post('/', auth, async (req, res) => {

    const { error } = validatePlayer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let player = new Player(_.pick(req.body, ['fullname', 'position', 'imageUrl']));
    await player.save();

    res.send(player);

});

/**
 * @api {get} /api/players/1
 * @apiName GetPlayerById
 * @apiGroup Players
 * 
 * @apiDescription Get a published player by Id.
 */
router.get('/:playerId', auth, async (req, res) => {

    const player = await Player.findById(req.params.playerId);
    res.send(player);

});

/**
 * @api {get} /api/players
 * @apiName GetPlayers
 * @apiGroup Players
 * 
 * @apiDescription Get all published players.
 */
router.get('/', auth, async (req, res) => {

    const players = await Player.find();
    res.send(players);

});

/**
 * @api {get} /api/players/1
 * @apiName DeletePlayerById
 * @apiGroup Players
 * 
 * @apiDescription Delete a player by Id.
 */
router.get('/:id', auth, async (req, res) => {

    const player = await Player.findByIdAndDelete(req.params.id);
    res.send(player);

});

module.exports = router;