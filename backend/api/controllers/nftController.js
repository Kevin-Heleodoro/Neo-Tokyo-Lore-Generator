const dotenv = require('dotenv');
const { Alchemy, Network } = require('alchemy-sdk');

const { ContractAddresses } = require('../../config/apiConfig.js');

class NFTController {
    // First attempt at finding a way to reduce the number of times we have to
    // create a new Alchemy instance. This is not the way to do it.
    // static async _alchemySetup() {
    //     dotenv.config();
    //     const config = {
    //         apiKey: process.env.ALCHEMY_API_KEY,
    //         network: Network.Mainnet,
    //     };
    //     const alchemy = new Alchemy(config);
    //     return alchemy;
    // }

    // This function is used to get the NFTs for a given address. It will
    // return an array of NFTs that are owned by the address.
    static async apiGetNFTsForOwner(req, res) {
        console.log('apiGetNFTsForOwner');
        dotenv.config();
        const config = {
            apiKey: process.env.ALCHEMY_API_KEY,
            network: Network.Mainnet,
        };
        const alchemy = new Alchemy(config);
        const address = req.params.address;
        try {
            // nfts["pageKeys"] will have a value if address has over 100 nfts,
            // look up how to submit request for next page of nfts
            const nfts = await alchemy.nft.getNftsForOwner(address);
            const numNfts = nfts['totalCount'];
            const nftList = nfts['ownedNfts'];

            let i = 1;
            let junkNfts = 0;
            const nftResults = [];
            for (let nft of nftList) {
                if (nft['name']) {
                    // console.log(`NFT #${i}: ${nft['name']}`);
                    nftResults.push(nft);
                    i++;
                } else {
                    junkNfts++;
                }
            }

            console.log(
                `Address: ${address} \nNumber of junk NFTs: ${junkNfts} \nTotal NFTs: ${numNfts}`
            );

            res.json(nftResults);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error,
                message: `Failed to get NFTs for owner ${address}`,
            });
        }
    }

    // This function is used to get the citizen for a given address. It will
    // return an array of NFTs that are owned by the address and are from
    // ContractAddresses.
    static async apiGetOwnersCitizen(req, res) {
        console.log('apiGetOwnersCitizen');
        dotenv.config();
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
            res.json(citizen);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error,
                message: `Failed to get citizen for owner ${address} ... meatbag!`,
            });
        }
    }
}

module.exports = { NFTController };
