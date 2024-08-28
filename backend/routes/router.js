const express = require('express');
const { check, validationResult } = require('express-validator');
const { rateLimit } = require('express-rate-limit');

const NFTController = require('../controllers/nftController.js');
const AIController = require('../controllers/aiController.js');
const validateAddress = require('../validators/validateAddress.js');
const validateAttributes = require('../validators/validateAttributes.js');
const validateSeries = require('../validators/validateSeries.js');

const router = express.Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many requests from this IP, please try again later!',
});

router
    .route('/citizen/wallet/:address')
    .get(validateAddress, NFTController.getCitizenByWallet);

router
    .route('/citizen/id/:tokenId/:series')
    .get(validateSeries, NFTController.getCitizenByTokenId);

router
    .route('/citizen/all/:series/:offset?')
    .get(validateSeries, NFTController.getAllCitizens);

router
    .route('/ai/generate')
    .post(limiter, validateAttributes, AIController.apiGetCitizenBackstory);

router.use((req, res) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = { router };
