/**
 * Created at 06/04/2018
 * By Adrien
 */
const express = require('express');
const http = require('http');

const path = require('path');
const rootDir = 'dist';

const app = module.exports.app = exports.app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const port = 8080;

const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://179764c03b0b49a3ab38cae00b242618@sentry.io/1417295' });

app.disable('x-powered-by');

app.use(express.static(rootDir));
app.set('views', path.join(rootDir, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/_')(app, jsonParser);
// require('./routes/acceuil')(app, jsonParser);

const server_http = http.createServer(app);
server_http.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        /**
         * Server is up
         * App is now ready to be used
         */
        console.log('#Server UP#');
    }
});