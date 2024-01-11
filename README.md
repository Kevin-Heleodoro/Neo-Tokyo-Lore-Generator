# Degenerifier

## The Citadel is watching ...

The idea behind this app is a fun project that will allow a Neo Tokyo citizen to connect to the app and have their citizen automatically re-imagined with different art styles.

## Get Started

1. Create a `.env.development` within the `/frontend` and `/backend` directories.
2. Start backend server with command: `npm run dev`
3. Start frontend with command: `npm start`

## To Do

### Frontend

-   a react frontend to display the citizen's NT portfolio (bytes, citizens, pieces)
-   Users signing on for the first time will be presented a screen that says something along the lines of welcome to the citizen law storymaker whatever they will sign in gasless transaction obviously and then that will present them to just a single page where they can connect their wallet and it'll pull up their citizens and they are able to create a background story for where their character came from in the Tokyo and then citizens that have previously come to the site they will be able to see their previous renderings of their background stories and all that people that don't have citizens obviously we just get told that their meat bags.

### Backend

-   web3 connectivity to ensure only citizens can connect
-   add support for wallet delegation

### AI

-   an ai model that can extract features from the image that can be used to re-generate the pic (inceptionv3?)
    -   Is this even necessary since we have the "traits" within the metadata?
-   an ai model that can generate new image based on prompts (bing, dall-e)
-   ai api to create a back story for a user based on features from the metadata of the citizen.

## Applications

[Frontend](./frontend/README.md)
[Middleware](./middleware/README.md)
[Backend](./backend/README.md)

## Timeline

### 12/5/2023

Backend

-   Created logic for pulling all nfts from an address and parsing through them.

### 12/7/2023

Backend

-   Created index.js
-   Created server.js
-   Created ./api/router.js
-   My original thoughts were to mimic the NetDex Project I made which implemented a Controller/DAO approach to routing API calls.

Frontend

-   Initialized frontend.
-   Created interface for handling middleware.

### 12/23/2023??

Backend

-   I tried to mimic the net2dev demo from youtube with having a middleware outside the backend, but there was some content missing and I'm not sure if it was because that developer was using Next.js instead of React.
-   Created the nftController that returns all of the nfts for a given address.

### 12/26/2023

Backend

-   Created route for getting a wallet's citizens. This is not the "best" way to do it, but it works for now. Will look into the most secure way to do so. Most likely will be within a smart contract itself.

Middleware

-   Not sure what to do with this...

Frontend

-   Need to remove the middleware calls and reroute to the backend.

### 12/27/2023

Frontend

-   Created .env.development.local to begin routing API to the backend.
-   Created interface to pull nfts for a wallet address and display them in browser.

### 12/28/2023

-   Consolidated the front and backend repos under 1 main repository and made first push to GitHub.
-   Troubleshooting the .env files with React. Each server will need to have their own `.env.development` and `.env.production`.
-   Created an [`AlchemyDataService`](./frontend/src/services/alchemy.js) class but it does not render the images like the [interfaces.js](./frontend/src/components/interfaces.js).
-

### 1/10/2024

-   Fixed the alchemyDataService in Frontend. I needed to set the methods to `async` and then `await` the calls.
-   Created first iteration of Header.
-   Created first iteration of NftCardContainer and NftCard
-   Added the getCitizenForWallet route to alchemy.js
-   Need to work on what I want the app to actually look like. Side navbar or top header? Do I even need a header? The MVP is to allow a citizen to connect their wallet, verify that they have a citizen NFT, grant access to lore generator, use chatgpt to create a background for the citizen based on the nft's traits, then allow the citizen to share on twitter

## Contributions

@goldensun.eth
