const bcrypt = require('bcrypt');
const { User, validateLogin } = require('../models/user');
const express = require('express');
const router = express.Router();

/**
 * Login
 */
router.post('/', async (req, res) => {

    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send({ 'data': null, "message": error.details[0].message });

    let user = await User.findOne({ cellphone: req.body.cellphone });
    if (!user) return res.status(400).send({ 'data': null, "message": 'The cellphone number you entered does not exist. Please enter a valid cellphone number to continue.' });

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(400).send({ 'data': null, "message": 'The password you have entered is not correct. Please make sure that you enter a correct password.' });

    const token = user.generateAuthToken();
    res.send({ 'data': { "token": token }, 'message': null });

});

module.exports = router;