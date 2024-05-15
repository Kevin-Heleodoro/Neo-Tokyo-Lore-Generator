import { Button } from 'react-bootstrap';

import Header from '../Header/Header';
import NftCardContainer from '../NftComponents/NftCardContainer';

const Dashboard = ({ nfts, loadNFTs }) => {
    return (
        <>
            <Header />
            <input type="text" id="wallet" />
            <Button onClick={loadNFTs} id="wallet">
                Load NFTs
            </Button>
            <NftCardContainer nfts={nfts} />
        </>
    );
};

export default Dashboard;
