const dotenv = require('dotenv');
const { Alchemy, Network } = require('alchemy-sdk');

const {
    ContractAddresses,
    MagicEdenImageURL,
} = require('../config/apiConfig.js');

/**
 * NFTController is a class that contains static functions to handle
 * requests related to NFTs. The functions in this class will be used
 * as the callback functions for the routes that are defined in the
 * router.js file.
 */
class NFTController {
    /**
     * This function is used to get the citizen for a given address. It will
     * return an array of NFTs that are owned by the address and are from
     * ContractAddresses.
     * @param {*} req params should contain the address of the owner
     * @param {*} res response will contain all NT ciizens owned by the address
     */
    static async getCitizenByWallet(req, res) {
        const config = {
            apiKey: process.env.ALCHEMY_API_KEY,
            network: Network.Mainnet,
        };
        const alchemy = new Alchemy(config);
        const address = req.params.address;

        try {
            // This is a bit of a hack, but it works for now. We get all the
            // NFTs for the address, then filter out the ones that aren't
            // from ContractAddresses. This is because the NFTs for the address
            // could be from multiple contracts, and we only want the ones
            // from ContractAddresses.
            const nfts = await alchemy.nft.getNftsForOwner(address);
            const nftList = nfts['ownedNfts'];
            let citizen = [];
            for (let nft of nftList) {
                if (
                    Object.values(ContractAddresses).includes(
                        nft['contract']['address']
                    )
                ) {
                    citizen.push(nft);
                }
            }

            if (citizen.length === 0) {
                res.json({
                    message: `No NT citizens found for owner ${address}`,
                    status: 204,
                });
                return;
            }

            res.json(citizen);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error,
                message: `Failed to get citizen for owner ${address} ... meatbag!`,
            });
        }
    }

    /**
     * This function is used to get the citizen for a given tokenId. It will
     * return the specific citizen with the token ID and series. The image url
     * is also updated to use Magic Eden's api to get the image.
     * @param {*} req params should contain the tokenId and series of the citizen
     * @param {*} res response will contain the citizen with the token ID and series
     */
    static async getCitizenByTokenId(req, res) {
        const config = {
            apiKey: process.env.ALCHEMY_API_KEY,
            network: Network.Mainnet,
        };
        const alchemy = new Alchemy(config);
        const tokenId = req.params.tokenId;
        const series = req.params.series;
        let contract;

        if (series === 'S1') {
            contract = ContractAddresses.NTCTZN;
        } else if (series === 'S2') {
            contract = ContractAddresses.NTOCTZN;
        } else {
            res.status(400).json({
                message: `Invalid series ${series}`,
            });
            return;
        }

        try {
            console.log(
                `Request for tokenId: ${tokenId}, series: ${series}, contract: ${contract}`
            );
            const nft = await alchemy.nft.getNftMetadata(contract, tokenId);
            nft.img = MagicEdenImageURL(series, tokenId);
            console.log(nft);
            res.json(nft);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error,
                message: `Failed to get citizen for owner ${tokenId} ... meatbag!`,
            });
        }
    }
}

module.exports = NFTController;
