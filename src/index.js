require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const status = require('http-status');

const AuthService = require('./services/AuthService');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get('/', (_, res) => {
  res.status(status.OK).send({
    success: true,
    message: 'Working!',
  });
});

app.post('/auth/verify-google-token', AuthService.verifyGoogleToken);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
