const express = require('express');
const auth = require('../routes/auth');
const teams = require('../routes/teams');
const articles = require('../routes/articles');
const reports = require('../routes/reports');
const users = require('../routes/users');
const media = require('../routes/media');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/teams', teams);
    app.use('/api/articles', articles);
    app.use('/api/reports', reports);
    app.use('/api/users', users);
    app.use('/api/media', media);
    app.use(error);
};