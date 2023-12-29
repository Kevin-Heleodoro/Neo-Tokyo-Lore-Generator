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
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let response = await fetch(url, options);
    let data = await response.json();
    console.log('getNFTsForOwner data: ' + data);
    return data;
}
