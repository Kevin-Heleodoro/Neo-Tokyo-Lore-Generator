import AlchemyDataService from './alchemy';

const isDevelopment = process.env.NODE_ENV === 'development';
const isLocalhost = window.location.hostname === 'localhost';

/**
 * This function gets all citizens for a series and returns the data in an array.
 *
 * @param {*} series The series to get citizens for
 * @param {*} offset The offset to start at
 * @param {*} limit The number of citizens to return
 * @returns
 */
export async function getAllCitizens(series, offset, limit) {
    let nftData = [];

    await AlchemyDataService.getAllCitizens(series, offset, limit)
        .then((response) => {
            if (isDevelopment || isLocalhost) {
                console.log(`Series: ${series} returned the following data:`);
                console.log(response.data);
            }

            if (response.status === 204) {
                return [];
            }

            nftData = response.data;
        })
        .catch((e) => {
            if (isDevelopment || isLocalhost) {
                console.log(e);
            } else {
                console.log('There was an error fetching the citizen data.');
            }
            return '';
        });

    return {
        nfts: nftData.nfts,
        nextOffset: nftData.nextOffset,
        count: nftData.count,
    };
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
            if (isDevelopment || isLocalhost) {
                console.log(`Address: ${wallet} returned the following data:`);
                console.log(response.data);
            }

            if (response.status === 204) {
                return [];
            }

            nftData = response.data;
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

/**
 * This function gets the citizen(s) for a token ID and series and returns the data in an array.
 *
 * @param {*} tokenId Token ID to get citizen data for
 * @param {*} series Inner (S1) or Outer (S2) citizen
 * @returns {Array} An array of citizen data
 */
export async function getCitizenByTokenId(tokenId, series) {
    let outArray = [];

    if (isDevelopment || isLocalhost) {
        console.log(
            `Called getCitizenByTokenId with params tokenId: ${tokenId}, series: ${series}`
        );
    }

    // Get the citizen(s) by token ID
    await AlchemyDataService.getCitizenByTokenId(tokenId, series)
        .then((response) => {
            if (isDevelopment || isLocalhost) {
                console.log(
                    `${series} ${tokenId} returned the following data:`
                );
                console.log(response.data);
            }

            if (response.status === 204) {
                return [];
            }

            outArray.push(response.data);
        })
        .catch((e) => {
            if (isDevelopment || isLocalhost) {
                console.log(e);
            } else {
                console.log('There was an error fetching the citizen data.');
            }
            return '';
        });

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
