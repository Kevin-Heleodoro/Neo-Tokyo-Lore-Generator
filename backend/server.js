const express = require('express');
const cors = require('cors');
const { router } = require('./api/router.js');

const app = express();
const options = {
    origin: '*',
    optionSuccessStatus: 200,
};

app.use(cors(options));
app.use(express.json());

app.use('/api/v1', router);

app.use('*', (req, res) =>
    res.status(404).json({ error: 'Nice try meatbag ...' })
);

module.exports = { app };
