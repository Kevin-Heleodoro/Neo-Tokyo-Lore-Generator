// Enum for Neo Tokyo contract addresses
const ContractAddresses = {
    CT2N: '0xd37ea75Dd3c499eDA76304f538CbF356Ed9e7Ed9', // Neo Tokyo Staked Citizen
    NTOCTZN: '0x4481507cc228FA19D203BD42110d679571f7912E', // Neo Tokyo Outer Citizen
    NTCTZN: '0xB9951B43802dCF3ef5b14567cb17adF367ed1c0F', // Neo Tokyo Citizen
};

// Configuration for the OpenAI system
const OpenAISystemConfig = {
    content:
        'You are a well read story teller specializing in futuristic steampunk literature. One of your main areas of focus is on a world where the city of Neo Tokyo is the central hub of civilization. Neo Tokyo citizens consist of four distinct levels: elite citizens, inner citizens, outer citizens, and meatbags. ' +
        "The lore of Neo Tokyo surrounds a NFT community whose sole purpose is to build a virtual equivalent to a SoHo house, but for gamers. Some popular destinations are Angie's bar, Shibuya Mall, and the Citadel." +
        'Your job is to generate a short backstory of a citizen using some keywords that are associated with that citizen.',
};

const MagicEdenImageURL = (series, tokenId) => {
    let contract;
    if (series == 'S1') {
        contract = ContractAddresses.NTCTZN;
    } else if (series == 'S2') {
        contract = ContractAddresses.NTOCTZN;
    } else {
        return '';
    }
    return `https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Frenderer.magiceden.dev%2Fv3%2Fethereum%2Frender%3Fcontract%3D${contract}%26tokenId%3D${tokenId}`;
};

module.exports = { ContractAddresses, OpenAISystemConfig, MagicEdenImageURL };

// "The Citizen Lore Initiative aims to collect user-submitted lore that Neo Tokyo citizens have developed about the Citizen assets they own. The Neo Tokyo writing team plans to use these character descriptions / stories in upcoming lore development.
// If a writer chooses to use your character, they will be in contact to follow up with questions, queries, concerns - and get your approval, before your character is included in the proposed lore.

// *Please keep in mind that thought-provoking and original ideas are more likely to be used. The classic "I'm the hero and the best at what I do" is less likely to be considered.

// Neo Tokyo is a diverse environment with many different corners and cultures, get creative! Make a character that feels natural to you, and get prepared for future role playing events and challenges!

// Lore Origins:
// Neo Tokyo is a metaverse created to escape the clutches of the UAEC (United Americas, Europe and China), a ‘one-world’ government.
// Concerned citizens could follow a bread crumb trail gaining pieces of a code that when combined allowed them to upload their minds into the Ether, leaving their bodies behind on Earth.

// Definitions:

// Neo Tokyo - The metaverse reality.
// UAEC - One world government seeking to control the people, including Neo Tokyo.
// The Citadel - The central area of Neo Tokyo city around Citadel Tower.
// Outerlands - A lawless area surrounding Neo Tokyo city.
// The Hands - A shrouded council of seven, responsible for the inner workings of Neo Tokyo.
// Citizens - Uploaded individuals with ID access to Neo Tokyo city.
// Outer Citizens - Uploaded individuals lost to the Outerlands. "
