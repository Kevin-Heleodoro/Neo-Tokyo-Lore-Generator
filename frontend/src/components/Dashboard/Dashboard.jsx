import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import NftCardContainer from '../NftComponents/NftCardContainer';
import { getCitizenForWallet } from '../../services/interfaces';
import HeaderComponent from '../Header/Header';

const Dashboard = ({ nfts, setNfts, loading, setLoading }) => {
    const location = useLocation();
    const signer = location.state.signer || '';

    const loadNFTs = async () => {
        setNfts([]);
        setLoading(true);

        let wallet = document.getElementById('wallet').value.toString();
        const outArray = await getCitizenForWallet(wallet);

        setNfts(outArray);
        setLoading(false);
    };

    return (
        <div id="app">
            <HeaderComponent walletAddress={signer.address} />
            <input type="text" id="wallet" />
            <Button onClick={loadNFTs} id="wallet">
                Load NFTs
            </Button>
            <NftCardContainer nfts={nfts} />
        </div>
    );
};

export default Dashboard;
