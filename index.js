const winston = require('winston');
const express = require('express');
const app = express();

app.use(express.urlencoded());
app.use(express.json());

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));