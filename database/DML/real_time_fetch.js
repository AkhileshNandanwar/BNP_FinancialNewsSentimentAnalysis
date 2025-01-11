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

// API Key and Endpoint
const API_KEY = '6ojJ7srX1GHQ19E3nDvvtsf3sPQ4a3uD'; // Replace with your Alpha Vantage API key
const BASE_URL = 'https://api.polygon.io';
const tickers = ['AAPL', 'GOOGL', 'TSLA', 'MSFT', 'AMZN']; // Add your tickers here

// Function to fetch live prices
async function fetchLivePrices() {
  for (const ticker of tickers) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: ticker,
          apikey: API_KEY,
        },
      });
      console.log(response.data)
      const price = parseFloat(response.data['Global Quote']['05. price']);
      if (!isNaN(price)) {
        storePrice(ticker, price);
      } else {
        console.error("Failed to fetch price for ${ticker}");
      }
    } catch (err) {
      console.error("Error fetching data for ${ticker}:", err.message);
    }
  }
}

// Function to store live prices in the database
function storePrice(ticker, price) {
  const query = `
    INSERT INTO stock_prices (ticker, price)
    VALUES (?, ?)
  `;
  db.run(query, [ticker, price], (err) => {
    if (err) {
      console.error("Error inserting price for ${ticker}:", err.message);
    } else {
      console.log("Price for ${ticker} updated: $${price}");
    }
  });
}

// Fetch live prices and store them
fetchLivePrices();

// Close the database connection after some delay to ensure all operations are complete
setTimeout(() => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
}, 5000); // Adjust delay as needed