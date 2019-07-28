const express = require('express');
const auth = require('../routes/auth');
const teams = require('../routes/teams');
const players = require('../routes/players');
const fixtures = require('../routes/fixtures');
const articles = require('../routes/articles');
const reports = require('../routes/reports');
const users = require('../routes/users');
const media = require('../routes/media');
const leagues = require('../routes/leagues');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/teams', teams);
    app.use('/api/players', players);
    app.use('/api/fixtures', fixtures);
    app.use('/api/articles', articles);
    app.use('/api/reports', reports);
    app.use('/api/users', users);
    app.use('/api/media', media);
    app.use('/api/leagues', leagues);
    app.use(error);
};