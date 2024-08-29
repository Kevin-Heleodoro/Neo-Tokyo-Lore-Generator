export const validateInput = (input) => {
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    const ensDomainRegex =
        /^[a-zA-Z0-9-]+(\.eth|\.xyz|\.luxe|\.kred|\.art|\.link|\.eth\.link)$/;
    const tokenIdRegex = /^\d+$/;

    if (input === '') {
        return 'ALL';
    } else if (ethAddressRegex.test(input)) {
        return 'wallet';
    } else if (ensDomainRegex.test(input)) {
        return 'wallet';
    } else if (tokenIdRegex.test(input)) {
        return 'token';
    } else {
        return 'invalid';
    }
};
