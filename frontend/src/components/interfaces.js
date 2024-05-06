import { ethers } from 'ethers';

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

export async function connectWallet() {
    console.log('connectWallet called');
    if (typeof window.ethereum !== 'undefined') {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            console.log(`Account: ${await signer.getAddress()}`);
            return signer;
        } catch (error) {
            console.log(`User denied account access: ${error}`);
        }
    } else {
        console.log('No ethereum provider found');
    }
}
