export const verifyResponseStatus = (response) => {
    if (response.status === 200) {
        return response;
    }

    if (response.status === 404) {
        throw new Error('Not found');
    }
};
