const express = require('express');
const { NFTController } = require('./controllers/nftController.js');

const router = express.Router();

router.route('/nfts/:address').get(NFTController.apiGetNFTsForOwner);
router.route('/citizen/:address').get(NFTController.apiGetOwnersCitizen);

module.exports = { router };
