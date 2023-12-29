const dotenv = require('dotenv');
// const { Alchemy, Network } = require('alchemy-sdk');
const { app } = require('./server.js');

async function main() {
    const port = process.env.PORT || 8082;

    dotenv.config();
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
