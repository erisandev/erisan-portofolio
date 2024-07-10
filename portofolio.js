// portfolio.js

const axios = require('axios');

// API endpoints
const coinGeckoAPI = 'https://api.coingecko.com/api/v3/simple/price';
const coinMarketCapAPI = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';

// API keys
const coinGeckoAPIKey = 'YOUR_COIN_GECKO_API_KEY';
const coinMarketCapAPIKey = 'YOUR_COIN_MARKET_CAP_API_KEY';

// Portfolio data
const portfolio = [
{
symbol: 'BTC',
amount: 1,
value: 0,
icon: 'https://example.com/btc-icon.png',
},
{
symbol: 'ETH',
amount: 2,
value: 0,
icon: 'https://example.com/eth-icon.png',
},
{
symbol: 'LTC',
amount: 3,
value: 0,
icon: 'https://example.com/ltc-icon.png',
},
];

// Function to update portfolio values
async function updatePortfolio() {
const promises = [];

// Loop through each asset in the portfolio
portfolio.forEach((asset) => {
// Get the current price of the asset from CoinGecko API
promises.push(axios.get(`${coinGeckoAPI}`, {
params: {
ids: asset.symbol,
vs_currencies: 'usd',
},
headers: {
'X-CoinGecko-API-Key': coinGeckoAPIKey,
},
}))
.then((response) => {
const price = response.data[asset.symbol].usd;
asset.value = price * asset.amount;
});
});

// Wait for all promises to resolve
await Promise.all(promises);

// Calculate the total portfolio value
const totalValue = portfolio.reduce((acc, asset) => acc + asset.value, 0);

console.log(`Total portfolio value: $${totalValue.toFixed(2)}`);
}

// Function to add a new asset to the portfolio
function addAsset(symbol, amount, icon) {
const newAsset = { symbol, amount, value: 0, icon };
portfolio.push(newAsset);
updatePortfolio();
}

// Function to remove an asset from the portfolio
function removeAsset(symbol) {
const index = portfolio.findIndex((asset) => asset.symbol === symbol);
if (index!== -1) {
portfolio.splice(index, 1);
updatePortfolio();
}
}

// Example usage
updatePortfolio();

addAsset('XRP', 100, 'https://example.com/xrp-icon.png');
removeAsset('LTC');
