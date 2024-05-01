import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import Header from './components/Header/Header';
import NftCardContainer from './components/NftComponents/NftCardContainer';

import AlchemyDataService from './services/alchemy';

export default function App() {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadNFTs = async () => {
        setNfts([]);
        setLoading(true);
        let wallet = document.getElementById('wallet').value.toString();

        let nftData = [];
        const outArray = [];

        // await AlchemyDataService.getNFTsForOwner(wallet)
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

        setNfts(outArray);
        setLoading(false);
    };

    return (
        <div className="App" style={{ 'text-align': 'center' }}>
            <Header />
            <input type="text" id="wallet" />
            <Button onClick={loadNFTs} id="wallet">
                Load NFTs
            </Button>
            {/* Setup a loading spinner while the api fetches the user's citizen. */}
            <NftCardContainer nfts={nfts} />
        </div>
    );
}
