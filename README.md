# akahu-transfer
A small script to transfer money between bank accounts using Akahu

## .env file setup
1. Create an Akahu account
2. Create a [personal app](https://developers.akahu.nz/docs/personal-apps)
3. Create `.env` file in root directory
4. Add `USER_TOKEN` and `APP_TOKEN` keys with values from your personal app

## Setup and use
1. `npm install`
2. Using your personal app credentials (see section above), find the Akahu IDs for the [accounts](https://developers.akahu.nz/reference/get_accounts) you want to transfer between
3. `npm start [FROM_AKAHU_ID] [TO_AKAHU_ID] [AMOUNT]`
