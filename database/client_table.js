const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database or create it
const db = new sqlite3.Database('finance_app.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create the portfolio table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS portfolio (
      investor_id INTEGER,
      ticker TEXT,
      average_price REAL,
      current_price REAL,
      total_investment REAL,
      quantity INTEGER,
      percentage_profit_loss REAL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table created or already exists.');
    }
  });

  // Insert dummy data
  const data = [
    [1, 'AAPL', 120.0, 145.0, 6000.0, 50, ((145.0 - 120.0) / 120.0) * 100],
    [1, 'GOOGL', 2000.0, 2800.0, 60000.0, 30, ((2800.0 - 2000.0) / 2000.0) * 100],
    [1, 'TSLA', 700.0, 650.0, 14000.0, 20, ((650.0 - 700.0) / 700.0) * 100],
    [1, 'MSFT', 250.0, 300.0, 7500.0, 30, ((300.0 - 250.0) / 250.0) * 100],
    [1, 'AMZN', 3300.0, 3100.0, 33000.0, 10, ((3100.0 - 3300.0) / 3300.0) * 100],
    [1, 'NFLX', 500.0, 450.0, 10000.0, 20, ((450.0 - 500.0) / 500.0) * 100],
    [1, 'NVDA', 190.0, 210.0, 9500.0, 50, ((210.0 - 190.0) / 190.0) * 100],
    [1, 'FB', 270.0, 320.0, 8100.0, 30, ((320.0 - 270.0) / 270.0) * 100],
    [1, 'BABA', 150.0, 140.0, 7500.0, 50, ((140.0 - 150.0) / 150.0) * 100],
    [1, 'V', 200.0, 220.0, 4000.0, 20, ((220.0 - 200.0) / 200.0) * 100],
    [1, 'JNJ', 150.0, 160.0, 4500.0, 30, ((160.0 - 150.0) / 150.0) * 100],
    [1, 'PG', 140.0, 145.0, 7000.0, 50, ((145.0 - 140.0) / 140.0) * 100],
    [1, 'DIS', 130.0, 120.0, 5200.0, 40, ((120.0 - 130.0) / 130.0) * 100],
    [1, 'XOM', 90.0, 95.0, 3600.0, 40, ((95.0 - 90.0) / 90.0) * 100],
    [1, 'INTC', 55.0, 50.0, 2750.0, 50, ((50.0 - 55.0) / 55.0) * 100],
  ];

  const insertQuery = `
    INSERT INTO portfolio (investor_id, ticker, average_price, current_price, total_investment, quantity, percentage_profit_loss)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  data.forEach((row) => {
    db.run(insertQuery, row, (err) => {
      if (err) {
        console.error('Error inserting data:', err.message);
      }
    });
  });

  console.log('Dummy data inserted successfully.');
});



db.all('SELECT * FROM portfolio', [], (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    console.log(rows);
  });

  // Close the database connection
db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });