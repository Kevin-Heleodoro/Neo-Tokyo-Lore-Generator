import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { getAlchemyInfo, getNFTsForOwner } from './components/interfaces';
import AlchemyDataService from './services/alchemy';
import './App.css';

export default function App() {
    const [nfts, setNfts] = useState([]);

    const loadNFTs = async () => {
        let wallet = document.getElementById('wallet').value.toString();
        console.log(`wallet: ${wallet}`);

        const nftData = await getNFTsForOwner(wallet);
        // let nftData = [];
        // AlchemyDataService.getNFTsForOwner(wallet)
        //     .then((response) => {
        //         console.log(response.data);
        //         nftData = response.data;
        //         // processNFTs(nftData);
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     });
        console.log(`nftData: ${nftData}`);

        const nftArray = nftData;
        const outArray = [];

        nftArray.forEach((nft) => {
            if (nft.contract.isSpam === true) return;
            let token = nft.tokenId;
            let name = nft.name;
            let imagePath = nft.image.originalUrl;

            if (imagePath === undefined) {
                return;
            } else {
                let desc = nft.description;
                let img = imagePath.replace('ipfs://', 'https://ipfs.io/ipfs/');
                let nftData = {
                    name,
                    img,
                    desc,
                    tokenId: token,
                };

                outArray.push(nftData);
                console.log(nftData);
            }
        });

        setNfts(outArray);
    };

    return (
        <div className="App">
            <input type="text" id="wallet" />
            <Button onClick={loadNFTs} id="wallet">
                Load NFTs
            </Button>
            {nfts.map((nft) => (
                <div key={nft.tokenId}>
                    <h2>{nft.name}</h2>
                    <img src={nft.img} alt={nft.name} />
                    <p>{nft.desc}</p>
                </div>
            ))}
        </div>
    );
}
