# Degenerifier

## The Citadel is watching ...

The idea behind this app is a fun project that will allow a Neo Tokyo citizen to connect to the app and have their citizen automatically re-imagined with different art styles.

## Get Started

1. Create a `.env.development` within the `/frontend` and `/backend` directories.
2. Start backend server with command: `npm run dev`
3. Start frontend with command: `npm start`

## Routes

/api/v1/citizen/:address

/api/v1/nfts/:address

/api/v1/ai/generate

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

## Resources

[OpenAI Quickstart Guide](https://platform.openai.com/docs/quickstart?context=node)

## Contributions

@goldensun.eth
