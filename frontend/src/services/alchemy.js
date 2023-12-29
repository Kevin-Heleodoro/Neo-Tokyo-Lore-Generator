import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL + 'api';

// This isn't rendering the images for some reason
// interfaces works fine

class AlchemyDataService {
    getAlchemyInfo(wallet) {
        console.log('getAlchemyInfo called');
        return axios.post(BASE_URL, { wallet });
    }

    getNFTsForOwner(address) {
        console.log('getNFTsForOwner called');
        return axios.get(BASE_URL + '/nfts/' + address);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AlchemyDataService();
