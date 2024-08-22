const { check, validationResult } = require('express-validator');

const validateAddress = [
    check('address')
        .isString()
        .custom((value) => {
            console.log(`Validating address: ${value}`);
            // Check if it's a valid Ethereum address
            const isEthereumAddress = /^0x[a-fA-F0-9]{40}$/.test(value);
            // Check if it's a valid ENS domain (basic check, can be expanded)
            const isEnsDomain =
                /^[a-zA-Z0-9-]+(\.eth|\.xyz|\.luxe|\.kred|\.art|\.link|\.eth\.link)$/.test(
                    value
                );

            if (!isEthereumAddress && !isEnsDomain) {
                throw new Error(
                    'Address must be a valid Ethereum address or ENS domain'
                );
            }

            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateAddress;
