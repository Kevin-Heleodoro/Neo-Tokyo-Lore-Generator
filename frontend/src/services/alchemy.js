import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL + 'api';

class AlchemyDataService {
    async getAlchemyInfo(wallet) {
        console.log('getAlchemyInfo called');
        return axios.post(BASE_URL, { wallet });
    }

    async getNFTsForOwner(address) {
        console.log('getNFTsForOwner called');
        return axios.get(BASE_URL + '/nfts/' + address);
    }

    async getCitizenForWallet(address) {
        console.log('getCitizenForWallet called');
        return axios.get(BASE_URL + '/citizen/' + address);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AlchemyDataService();
