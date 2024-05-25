const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const { router } = require('./api/router.js');

const app = express();

const whitelist = [process.env.REACT_APP_BASE_URL];
if (process.env.NODE_ENV === 'development') {
    whitelist.push('http://localhost:3000');
}

const options = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionSuccessStatus: 200,
};

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later!',
});

app.use(limiter);
app.use(cors(options));
app.use(express.json());

app.use('/api/v1', router);

app.use('*', (req, res) =>
    res.status(404).json({ error: 'Nice try meatbag ...' })
);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = { app };
