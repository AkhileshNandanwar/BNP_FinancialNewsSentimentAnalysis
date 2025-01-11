const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('finance_app.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create the recommendation table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS recommendation (
      recommendation_id INTEGER PRIMARY KEY AUTOINCREMENT,
      investor_id INTEGER NOT NULL,
      ticker TEXT NOT NULL,
      recommendation TEXT NOT NULL,
      time_stamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      news_article TEXT,
      FOREIGN KEY (investor_id) REFERENCES portfolio (investor_id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) {
      console.error('Error creating recommendation table:', err.message);
    } else {
      console.log('Recommendation table created successfully.');
    }
  });
});

// Function to read recommendations for a specific investor
function getRecommendationsByInvestorId(investorId) {
  const query = `
    SELECT ticker, recommendation, time_stamp, news_article
    FROM recommendation
    WHERE investor_id = ?
  `;

  db.all(query, [investorId], (err, rows) => {
    if (err) {
      console.error('Error fetching recommendations:', err.message);
    } else if (rows.length === 0) {
      console.log("No recommendations found for Investor ID: ${investorId}");
    } else {
      console.log("Recommendations for Investor ID: ${investorId}");
      rows.forEach((row, index) => {
        console.log("${index + 1}. Ticker: ${row.ticker}, Recommendation: ${row.recommendation}, Time: ${row.time_stamp}, News Article: ${row.news_article}");
      });
    }
  });
}

// Fetch recommendations for a specific investor
const investorId = 1; // Replace with the desired investor ID
getRecommendationsByInvestorId(investorId);

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing the database:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});
