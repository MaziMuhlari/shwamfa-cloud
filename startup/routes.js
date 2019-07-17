const express = require('express');
const teams = require('../routes/teams');
const players = require('../routes/players');
const fixtures = require('../routes/fixtures');
const articles = require('../routes/articles');
const reports = require('../routes/reports');
const users = require('../routes/users');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/teams', teams);
    app.use('/api/players', players);
    app.use('/api/fixtures', fixtures);
    app.use('/api/articles', articles);
    app.use('/api/reports', reports);
    app.use('/api/users', users);
    app.use(error);
}