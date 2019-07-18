const auth = require('../middleware/authentication');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateJoin } = require('../models/user');
const express = require('express');
const router = express.Router();

/**
 * Create Account
 */
router.post('/', async (req, res) => {

    const { error } = validateJoin(req.body);
    if (error) return res.status(400).send({ 'data': null, "message": error.details[0].message });

    let user = await User.findOne({ cellphone: req.body.cellphone });
    if (user) return res.status(400).send({ 'data': null, "message": 'A user with that cellphone number already exists. You will need to provide another cellphone number.' });

    user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ 'data': null, "message": 'A user with that email address already exists. You will need to provide another email address.' });

    user = new User(_.pick(req.body, ['name', 'surname', 'cellphone', 'email', 'password', 'favourite']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({ 'data': _.pick(user, ['_id', 'name', 'surname', 'cellphone', 'email', 'favourite']), 'message': null });

});

/**
 * Get Profile Information
 */
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send({ 'data': user, 'message': null });
});

/**
 * Reset Password
 */
router.post("/password/reset", async (req, res) => {
});

/**
 * Change Password
 */
router.post("/password/change", async (req, res) => {
});

module.exports = router;