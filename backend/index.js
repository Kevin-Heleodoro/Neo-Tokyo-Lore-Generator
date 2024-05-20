const dotenv = require('dotenv');
// const { Alchemy, Network } = require('alchemy-sdk');
const { app } = require('./server.js');

async function main() {
    dotenv.config({ path: '.env.development' });
    const port = process.env.SERVER_PORT || 8082;

    try {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);

module.exports = { app };
