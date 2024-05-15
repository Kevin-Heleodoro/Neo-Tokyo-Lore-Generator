import AlchemyDataService from './alchemy';

export async function getAlchemyInfo(wallet) {
    console.log('getAlchemyInfo called');
    const url = process.env.REACT_APP_API_BASE_URL + 'api';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet }),
    };
    let response = await fetch(url, options);
    let data = await response.json();
    console.log('getAlchemyInfo data: ' + data);
    return data;
}

export async function getNFTsForOwner(address) {
    console.log('getNFTsForOwner called');
    const url = process.env.REACT_APP_API_BASE_URL + 'api/nfts/' + address;
    console.log({ url });
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    console.log({ options });
    let response = await fetch(url, options);
    let data = await response.json();
    console.log('getNFTsForOwner data: ' + data);
    return data;
}

/**
 * This function gets the citizen(s) for a wallet address and returns the data in an array
 *
 * @param {*} wallet
 * @returns {Array} outArray
 */
export async function getCitizenForWallet(wallet) {
    let nftData = [];
    const outArray = [];

    await AlchemyDataService.getCitizenForWallet(wallet)
        .then((response) => {
            nftData = response.data;
        })
        .catch((e) => {
            console.log(e);
        });

    nftData.forEach((nft) => {
        if (nft.contract.isSpam === true) return;
        let imagePath = nft.image.originalUrl;

        if (imagePath === undefined) {
            return;
        } else {
            let nftData = {
                img: imagePath.replace('ipfs://', 'https://ipfs.io/ipfs/'),
                ...nft,
            };
            console.log(nftData);
            outArray.push(nftData);
        }
    });

    return outArray;
}
