import dotenv from 'dotenv';
import { Alchemy, Network } from 'alchemy-sdk';

dotenv.config();

const config = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.Mainnet,
};

const alchemy = new Alchemy(config);

const main = async (address) => {
    // nfts["pageKeys"] will have a value if address has over 100 nfts,
    // look up how to submit request for next page of nfts
    const nfts = await alchemy.nft.getNftsForOwner(address);
    const numNfts = nfts['totalCount'];
    const nftList = nfts['ownedNfts'];

    console.log(`Total number of NFTs owned by ${address}: ${numNfts}`);

    let i = 1;
    let junkNfts = 0;
    for (let nft of nftList) {
        if (nft['name']) {
            console.log(`NFT #${i}: ${nft['name']}`);
            i++;
        } else {
            junkNfts++;
        }
    }

    console.log(`Number of junk NFTs: ${junkNfts}`);
};

const runMain = async () => {
    try {
        await main('goldensun.eth');
        process.exit(0);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

export default runMain;
