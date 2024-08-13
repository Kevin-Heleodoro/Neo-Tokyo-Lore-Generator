# NeoScribe

## The Citadel is watching ...

The idea behind this app is a fun project that will allow a Neo Tokyo citizen to connect to the app and generate a backstory for their citizen based on the citizen's attributes.

## Get Started Locally

1. Create a `.env.development` within the `/frontend` and `/backend` directories.
2. Start backend server with command: `npm run dev`
3. Start frontend with command: `npm start`

## Endpoints

/api/v1/citizen/:address

/api/v1/nfts/:address

/api/v1/ai/generate

## To Do

### Frontend

-   a react frontend to display the citizen's NT portfolio (bytes, citizens, pieces)
-   Users signing on for the first time will be presented a screen that says something along the lines of welcome to the citizen law storymaker whatever they will sign in gasless transaction obviously and then that will present them to just a single page where they can connect their wallet and it'll pull up their citizens and they are able to create a background story for where their character came from in the Tokyo and then citizens that have previously come to the site they will be able to see their previous renderings of their background stories and all that people that don't have citizens obviously we just get told that their meat bags.
-   Error handling on wallet connection
-   Resize the favicon
-   Handle redirecting to `/` when not connected
-   Handle failed response from server
-   Add logging for error handling
-   Add a back to `/home` button on 404 page
-   neumorphism for nftcards? Open up individual cards for further details?

### Backend

-   web3 connectivity to ensure only citizens can connect
-   add support for wallet delegation
-   Reduce number of times the alchemy provider needs to be created
    -   Abstract into the server and pass it into the controller functions?
-   CORS to deployed site

### AI

-   an ai model that can extract features from the image that can be used to re-generate the pic (inceptionv3?)
    -   Is this even necessary since we have the "traits" within the metadata?
-   an ai model that can generate new image based on prompts (bing, dall-e)
-   ai api to create a back story for a user based on features from the metadata of the citizen.
-   have their citizen automatically re-imagined with different art styles.
-   improve the context for the ai lore storyteller

## Resources

[OpenAI Quickstart Guide](https://platform.openai.com/docs/quickstart?context=node)

[Delegate.xyz](https://docs.delegate.xyz/)

[Ethers.js Documentation](https://docs.ethers.org/v6/)

[React Router](https://reactrouter.com/en/main/start/tutorial)

https://create-react-app.dev/docs/adding-custom-environment-variables/

https://neo-tokyo-citizen-lore-generator.onrender.com/

https://stackoverflow.com/questions/76435306/babel-preset-react-app-is-importing-the-babel-plugin-proposal-private-propert

https://docs.google.com/forms/d/e/1FAIpQLSc2wlTguQ2yQamobh5rLqdm80DlXkht0MEapX7n0vIxaotXLQ/viewform

## Contributions

@goldensun.eth
