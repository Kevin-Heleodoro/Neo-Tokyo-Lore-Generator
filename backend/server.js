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
console.log('REACT_APP_BASE_URL:', process.env.REACT_APP_BASE_URL);

const app = express();

app.use(helmet());
app.use(compression());

const whitelist = [process.env.REACT_APP_BASE_URL];
if (process.env.NODE_ENV === 'development') {
    whitelist.push('http://localhost:3000');
}

const corsOptions = {
    origin: (origin, callback) => {
        console.log(`Incoming request from origin: ${origin}`); // Add this line
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            console.error(`Blocked by CORS: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
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
