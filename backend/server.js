const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');

const { router } = require('./routes/router.js');
const errorHandler = require('./middlewares/errorHandler.js');

dotenv.config();

// Debugging: Log the loaded environment variables
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('SERVER_PORT:', process.env.SERVER_PORT);
console.log('REACT_APP_BASE_URL:', process.env.REACT_APP_BASE_URL);

const app = express();

app.use(helmet());
app.use(compression());

const whitelist = [process.env.REACT_APP_BASE_URL];
if (process.env.NODE_ENV === 'development') {
    whitelist.push('http://localhost:3000');
}

console.log(`Whitelist: ${whitelist}`);

const options = {
    origin: (origin, callback) => {
        if (
            whitelist.some((allowedOrigin) => allowedOrigin === origin) ||
            !origin
        ) {
            callback(null, true);
        } else {
            console.error(`Blocked by CORS: ${origin}`);
            console.error(`Allowed origins: ${whitelist}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
    credentials: true,
};

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10,
    message: 'Too many requests from this IP, please try again later!',
});

app.use(limiter);
app.use(cors(options));
app.use(express.json());

app.use('/api/v1', router);

app.use('*', (req, res) =>
    res.status(404).json({ error: 'Nice try meatbag ...' })
);

app.use(errorHandler);

module.exports = { app };
