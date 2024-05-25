const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');

const { app } = require('./server.js');

let envFile =
    process.env.NODE_ENV === 'production' ? '.env' : '.env.development';
dotenv.config({ path: envFile });

app.use(helmet());
app.use(compression());

async function main() {
    const port = process.env.SERVER_PORT || 8082;

    try {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }

    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.info('SIGTERM signal received. Closing HTTP server.');
        app.close(() => {
            console.info('HTTP server closed.');
            process.exit(0);
        });
    });

    process.on('SIGINT', () => {
        console.info('SIGINT signal received. Closing HTTP server.');
        app.close(() => {
            console.info('HTTP server closed.');
            process.exit(0);
        });
    });
}

main().catch((e) => {
    console.error('Unhandled promise rejection. Exiting process.', e);
    process.exit(1);
});

module.exports = { app };
