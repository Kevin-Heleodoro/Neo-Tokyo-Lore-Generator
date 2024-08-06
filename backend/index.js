const dotenv = require('dotenv');

const { app } = require('./server.js');

if (process.env.NODE_ENV !== 'production') {
    let envFile =
        process.env.NODE_ENV === 'development' ? '.env.development' : '.env';
    dotenv.config({ path: envFile });
} else {
    dotenv.config();
}

async function main() {
    const port = process.env.SERVER_PORT || 8082;
    let server;

    try {
        server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }

    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.info('SIGTERM signal received. Closing HTTP server.');
        server.close(() => {
            console.info('HTTP server closed.');
            process.exit(0);
        });
    });

    process.on('SIGINT', () => {
        console.info('SIGINT signal received. Closing HTTP server.');
        server.close(() => {
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
