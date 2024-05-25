import { JsonRpcSigner, ethers } from 'ethers';

export async function connectWallet() {
    let provider;

    if (window.ethereum == null) {
        console.log('MetaMask not installed; using read-only defaults');
        provider = ethers.getDefaultProvider();
    } else {
        try {
            provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            let signer = await getSigner(provider);

            let currentDate = new Date();
            let signature = await signer.signMessage(
                `Hello, Citizen! \nYou are logging into the Neo Tokyo Lore Generator on ${currentDate}!`
            );

            await setLocalStoredAddress(signer.address);
            return { signature, signer };
        } catch (error) {
            console.error(`User denied account access: ${error}`);
            return { signature: null, signer: null };
        }
    }
}

export async function disconnectWallet() {
    removeLocalStoredAddress();
}

export const formatAddress = (address) => {
    return `${address.slice(0, 7)}...${address.slice(-5)}`;
};

async function getSigner(provider) {
    let localAddress = window.localStorage.getItem('walletAddress');
    if (localAddress) {
        return new JsonRpcSigner(provider, localAddress);
    } else {
        return await provider.getSigner();
    }
}

async function setLocalStoredAddress(address) {
    window.localStorage.setItem('walletAddress', address);
}

async function removeLocalStoredAddress() {
    window.localStorage.removeItem('walletAddress');
}
