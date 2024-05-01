const express = require('express');
const { NFTController } = require('./controllers/nftController.js');
const { AIController } = require('./controllers/aiController.js');

const router = express.Router();

router.route('/nfts/:address').get(NFTController.apiGetNFTsForOwner);
router.route('/citizen/:address').get(NFTController.apiGetOwnersCitizen);

router.route('/ai/generate').post(AIController.apiGetCitizenBackstory);

module.exports = { router };
