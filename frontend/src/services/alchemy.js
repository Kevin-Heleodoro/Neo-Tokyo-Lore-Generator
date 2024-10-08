import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL + 'api/v1';

// Determine if the environment is development or local
const isDevelopment = process.env.NODE_ENV === 'development';
const isLocalhost = window.location.hostname === 'localhost';

class AlchemyDataService {
    async getCitizenByWallet(address) {
        if (isDevelopment || isLocalhost) {
            console.log(
                `AlchemyDataService.getCitizenByWallet called for address: ${address}`
            );
        }
        return axios.get(BASE_URL + '/citizen/wallet/' + address);
    }

    async getCitizenByTokenId(tokenId, series) {
        if (isDevelopment || isLocalhost) {
            console.log(
                `AlchemyDataService.getCitizenByTokenId called for tokenId: ${tokenId}, series: ${series}`
            );
        }
        return axios.get(BASE_URL + '/citizen/id/' + tokenId + '/' + series);
    }

    async getLoreForCitizen(citizen) {
        if (isDevelopment || isLocalhost) {
            console.log(
                `AlchemyDataService.getLoreForCitizen called for citizen: ${citizen}`
            );
        }
        return axios.post(BASE_URL + '/ai/generate', citizen);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AlchemyDataService();
