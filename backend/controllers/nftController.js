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
                console.log(
                    `Request (getCitizenByWallet) for owner ${address} returned no NT citizens`
                );
                return res.status(204).json();
            }

            res.json(citizen);
        } catch (error) {
            console.log(
                `Request (getCitizenByWallet) for owner ${address} failed.`
            );
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

        let contract =
            series == 'S1'
                ? ContractAddresses.NTCTZN
                : ContractAddresses.NTOCTZN;

        try {
            const nft = await alchemy.nft.getNftMetadata(contract, tokenId);

            if (!nft || !nft.name) {
                console.log(
                    `Request (getCitizenByTokenId) for ${series} #${tokenId} returned no NT citizens`
                );
                return res.status(204).json();
            }

            nft.img = MagicEdenImageURL(series, tokenId);
            res.json(nft);
        } catch (error) {
            console.log(
                `Request (getCitizenByTokenId) for ${series} #${tokenId} failed.`
            );
            console.log(error);
            res.status(500).json({
                error: error,
                message: `Failed to get citizen ${series} #${tokenId}.`,
            });
        }
    }

    /**
     * This function is used to get all citizens for a given series. It will
     * return an array of NFTs that are from the given series. The image url
     * is also updated to use Magic Eden's api to get the image.
     * @param {*} req params should contain the series and optional offset
     * @param {*} res response will contain the current offset of 100 NT citizens
     * @returns
     */
    static async getAllCitizens(req, res) {
        const config = {
            apiKey: process.env.ALCHEMY_API_KEY,
            network: Network.Mainnet,
        };
        const alchemy = new Alchemy(config);
        const series = req.params.series;
        const offset = req.params.offset || '';
        const limit = req.params.limit || 15;

        let contract =
            series == 'S1'
                ? ContractAddresses.NTCTZN
                : ContractAddresses.NTOCTZN;

        try {
            console.log(
                `Calling getAllCitizens for ${series} = ${contract}, offset = ${offset}`
            );

            const response = await alchemy.nft.getNftsForContract(contract, {
                pageKey: offset,
                pageSize: limit,
            });

            console.log(Object.keys(response));

            let nfts = response['nfts'];

            if (!nfts || !nfts.length) {
                console.log(
                    `Request (getAllCitizens) for ${series} returned no NT citizens`
                );
                return res.status(204).json();
            }

            let citizens = [];
            for (let nft of nfts) {
                let citizen = {
                    tokenId: nft.tokenId,
                    name: nft.name,
                    series: series,
                    img: MagicEdenImageURL(series, nft.tokenId),
                    description: nft.description,
                    raw: {
                        metadata: nft.raw.metadata,
                    },
                    contract: nft.contract,
                };

                citizens.push(citizen);
            }

            res.json({
                nfts: citizens,
                nextOffset: response['pageKey'],
                count: citizens.length,
            });
        } catch (error) {
            console.log(`Request (getAllCitizens) for ${series} failed.`);
            console.log(error);
            res.status(500).json({
                error: error,
                message: `Failed to get all citizens for ${series}.`,
            });
        }
    }
}

module.exports = NFTController;
