const winston = require('winston');

function error(err, req, res, next) {
    winston.error(err.message, err);
    res.status(500).send('Internal server error.');
}

module.exports = error;