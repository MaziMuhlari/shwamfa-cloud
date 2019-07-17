const config = require('config');
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    mongoose
        .connect(config.get('db'), {
            server: {
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1000
            }
        })
        .then(() => winston.info('Connected to MongoDB...'));
}