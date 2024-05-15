import { Button } from 'react-bootstrap';

import Header from '../Header/Header';
import NftCardContainer from '../NftComponents/NftCardContainer';
// import AlchemyDataService from '../../services/alchemy';
import { getCitizenForWallet } from '../../services/interfaces';

const Dashboard = ({ nfts, setNfts, loading, setLoading }) => {
    const loadNFTs = async () => {
        setNfts([]);
        setLoading(true);
        let wallet = document.getElementById('wallet').value.toString();

        const outArray = await getCitizenForWallet(wallet);
        // let nftData = [];
        // const outArray = [];

        // await AlchemyDataService.getNFTsForOwner(wallet)
        // await AlchemyDataService.getCitizenForWallet(wallet)
        //     .then((response) => {
        //         nftData = response.data;
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     });

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
        //         console.log(nftData);
        //         outArray.push(nftData);
        //     }
        // });

        setNfts(outArray);
        setLoading(false);
    };

    return (
        <div id="app">
            <Header />
            <input type="text" id="wallet" />
            <Button onClick={loadNFTs} id="wallet">
                Load NFTs
            </Button>
            <NftCardContainer nfts={nfts} />
        </div>
    );
};

export default Dashboard;
