import { ethers } from 'ethers';

export async function connectWallet() {
    let provider;
    let signer = null;

    if (window.ethereum == null) {
        console.log('No ethereum provider found');
        provider = ethers.getDefaultProvider();
    } else {
        try {
            provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            signer = await provider.getSigner();
            return signer;
        } catch (error) {
            console.log(`User denied account access: ${error}`);
        }
    }
}

export const formatAddress = (address) => {
    return `${address.slice(0, 6)} ... ${address.slice(-4)}`;
};
