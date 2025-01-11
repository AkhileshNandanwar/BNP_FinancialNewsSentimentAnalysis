const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');

// Connect to SQLite database
const db = new sqlite3.Database('finance_app.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Polygon.io API settings
const API_KEY = '6ojJ7srX1GHQ19E3nDvvtsf3sPQ4a3uD'; // Replace with your Polygon.io API key
const BASE_URL = 'https://api.polygon.io/v2/aggs/ticker';

// List of tickers from the portfolio
const tickers = ['AAPL', 'GOOGL', 'TSLA', 'MSFT', 'AMZN'];

// Function to fetch live stock prices from Polygon.io
async function fetchLivePrices(ticker) {
  try {
    const response = await axios.get(`${BASE_URL}/${ticker}/prev`, {
      params: { apiKey: API_KEY },
    });

    const results = response.data.results;
    if (results && results.length > 0) {
      const price = results[0].c; // 'c' is the close price
      return parseFloat(price); // Convert to a number
    } else {
      console.error("No valid price data for ${ticker}:", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error fetching price for ${ticker}:", err.message);
    return null;
  }
}

// Function to update portfolio table with live prices and recalculate percentage profit/loss
async function updatePortfolioPrices() {
  for (const ticker of tickers) {
    const currentPrice = await fetchLivePrices(ticker);
    if (currentPrice !== null) {
      db.get('SELECT * FROM portfolio WHERE ticker = ?', [ticker], (err, row) => {
        if (err) {
          console.error('Error fetching portfolio data:', err.message);
        } else if (row) {
          const { average_price, quantity } = row;
          const totalInvestment = average_price * quantity;
          const percentageProfitLoss = ((currentPrice - average_price) / average_price) * 100;

          // Update current price and percentage profit/loss in the database
          const updateQuery = `
            UPDATE portfolio
            SET current_price = ?, percentage_profit_loss = ?
            WHERE ticker = ?
          `;
          
          db.run(updateQuery, [currentPrice, percentageProfitLoss, ticker], (err) => {
            if (err) {
              console.error(`Error updating price for ${ticker}:`, err.message);
            } else {
              console.log(
                `Updated price for ${ticker}: $${currentPrice.toFixed(2)} (Profit/Loss: ${percentageProfitLoss.toFixed(2)}%)`
              );
            }
          });
        }
      });
    }
  }
}

// Update portfolio prices every 30 minutes (1 minute in your code)
setInterval(updatePortfolioPrices, 1 * 60 * 1000); // 1 minute interval

// Initial update
updatePortfolioPrices();

// // Close the database connection after the update (optional, you can keep it open if needed)
// setTimeout(() => {
//   db.close((err) => {
//     if (err) {
//       console.error('Error closing the database:', err.message);
//     } else {
//       console.log('Database connection closed.');
//     }
//   });
// }, 5000);