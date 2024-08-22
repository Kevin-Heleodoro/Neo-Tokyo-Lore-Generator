import AlchemyDataService from './alchemy';

const isDevelopment = process.env.NODE_ENV === 'development';
const isLocalhost = window.location.hostname === 'localhost';

export async function getAlchemyInfo(wallet) {
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
    if (isDevelopment || isLocalhost) {
        console.log('getAlchemyInfo data: ' + data);
    }
    return data;
}

export async function getNFTsForOwner(address) {
    const url = process.env.REACT_APP_API_BASE_URL + 'api/nfts/' + address;
    console.log({ url });
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (isDevelopment || isLocalhost) {
        console.log({ options });
    }
    let response = await fetch(url, options);
    let data = await response.json();
    if (isDevelopment || isLocalhost) {
        console.log('getNFTsForOwner data: ' + data);
    }
    return data;
}

/**
 * This function gets the citizen(s) for a wallet address and returns the data in an array.
 *
 * @param {String} wallet The wallet address to get citizen data for
 * @returns {Array} An array of citizen data
 */
export async function getCitizenByWallet(wallet) {
    let nftData = [];
    const outArray = [];

    // Get the citizen(s) for the wallet address
    await AlchemyDataService.getCitizenByWallet(wallet)
        .then((response) => {
            nftData = response.data;
            if (isDevelopment || isLocalhost) {
                console.log(nftData);
            }
        })
        .catch((e) => {
            if (isDevelopment || isLocalhost) {
                console.log(e);
            } else {
                console.log('There was an error fetching the citizen data.');
            }
            return '';
        });

    // Filter out spam contracts and add the image URL to the data
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
            outArray.push(nftData);
        }
    });

    return outArray;
}

export async function getCitizenByTokenId(tokenId, series) {
    let nftData = [];
    const outArray = [];

    if (isDevelopment || isLocalhost) {
        console.log(`tokenId: ${tokenId}, series: ${series}`);
    }

    // Get the citizen(s) by token ID
    await AlchemyDataService.getCitizenByTokenId(tokenId, series)
        .then((response) => {
            nftData = response.data;
            if (isDevelopment || isLocalhost) {
                console.log(nftData);
            }
        })
        .catch((e) => {
            if (isDevelopment || isLocalhost) {
                console.log(e);
            } else {
                console.log('There was an error fetching the citizen data.');
            }
            return '';
        });

    // Filter out spam contracts and add the image URL to the data
    // nftData.forEach((nft) => {
    //     if (nft.contract.isSpam === true) return;
    //     let imagePath = nft.image.originalUrl;

    //     if (imagePath === undefined) {
    //         return;
    //     } else {
    //         let nftData = {
    //             img: imagePath.replace('ipfs://', 'https://ipfs.io/ipfs/'),
    //             ...nft,
    //         };
    //         outArray.push(nftData);
    //     }
    // });

    console.log('called getCitizenByTokenId');

    return outArray;
}

/**
 * This function takes the citizen's metadata and calls on the backend to create a backstory for this citizen.
 *
 * @param {Object} citizen
 * @returns {String} The citizen's backstory
 */
export async function getLoreForCitizen(citizen) {
    let result;

    await AlchemyDataService.getLoreForCitizen(citizen)
        .then((response) => {
            if (isDevelopment || isLocalhost) {
                console.log(response.data);
            }
            result = response.data;
        })
        .catch((e) => {
            if (isDevelopment || isLocalhost) {
                console.log(e);
            } else {
                console.log('There was an error fetching the lore data.');
            }
            return '';
        });

    return result;
}
