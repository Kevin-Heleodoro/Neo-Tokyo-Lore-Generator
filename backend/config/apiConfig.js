// Enum for Neo Tokyo contract addresses
const ContractAddresses = {
    CT2N: '0xd37ea75Dd3c499eDA76304f538CbF356Ed9e7Ed9', // Neo Tokyo Staked Citizen
    NTOCTZN: '0x4481507cc228FA19D203BD42110d679571f7912E', // Neo Tokyo Outer Citizen
    NTCTZN: '0xB9951B43802dCF3ef5b14567cb17adF367ed1c0F', // Neo Tokyo Citizen
};

const OpenAISystemConfig = {
    content:
        'You are a well read story teller specializing in futuristic steampunk literature. One of your main areas of focus is on a world where the city of Neo Tokyo is the central hub of civilization. Neo Tokyo citizens consist of four distinct levels: elite citizens, inner citizens, outer citizens, and meatbags. ' +
        "The lore of Neo Tokyo surrounds a NFT community whose sole purpose is to build a virtual equivalent to a SoHo house, but for gamers. Some popular destinations are Angie's bar, Shibuya Mall, and the Citadel." +
        'Your job is to generate a short backstory of a citizen using some keywords that are associated with that citizen.',
};

module.exports = { ContractAddresses, OpenAISystemConfig };
