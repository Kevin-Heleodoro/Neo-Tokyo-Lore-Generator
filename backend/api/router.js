const express = require('express');
const { check, validationResult } = require('express-validator');
const { rateLimit } = require('express-rate-limit');

const { NFTController } = require('./controllers/nftController.js');
const { AIController } = require('./controllers/aiController.js');

const router = express.Router();

const validateAddress = [
    check('address')
        .isString()
        .custom((value) => {
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

const validateAttributes = [
    check('name').isString().withMessage('Name must be a string'),
    check('attributes').isArray().withMessage('Attributes must be an array'),
    check('attributes.*').custom((attribute) => {
        if (typeof attribute !== 'object') {
            throw new Error('Each attribute must be an object');
        }
        if (
            !attribute.hasOwnProperty('value') ||
            !attribute.hasOwnProperty('trait_type')
        ) {
            throw new Error(
                'Each attribute must have value and trait_type properties'
            );
        }
        if (!['string', 'number'].includes(typeof attribute.value)) {
            throw new Error('The value property must be a string or number');
        }
        if (!['string', 'number'].includes(typeof attribute.trait_type)) {
            throw new Error(
                'The trait_type property must be a string or number'
            );
        }
        if (
            attribute.hasOwnProperty('max_value') &&
            typeof attribute.max_value !== 'number'
        ) {
            throw new Error(
                'The max_value property must be a number if present'
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

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many requests from this IP, please try again later!',
});

router
    .route('/nfts/:address')
    .get(validateAddress, NFTController.apiGetNFTsForOwner);

router
    .route('/citizen/:address')
    .get(validateAddress, NFTController.apiGetOwnersCitizen);

router
    .route('/ai/generate')
    .post(limiter, validateAttributes, AIController.apiGetCitizenBackstory);

router.use((req, res) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = { router };
