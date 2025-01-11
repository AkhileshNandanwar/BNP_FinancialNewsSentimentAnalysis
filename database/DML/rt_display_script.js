const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('finance_app.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});



// const query = `
//   SELECT ticker, price, time_stamp 
//   FROM stock_prices 
//   WHERE time_stamp = (SELECT MAX(time_stamp) FROM stock_prices WHERE ticker = stock_prices.ticker)
// `;

// // Execute the query
// db.all(query, [], (err, rows) => {
//     if (err) {
//       console.error('Error executing query:', err.message);
//       return;
//     }
  
//     // Process the rows returned by the query
//     console.log('Query results:', rows);
//   });
  
  db.all('SELECT * FROM portfolio', [], (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    console.log(rows);
  });




  
  // Close the database connection when done
  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err.message);
      return;
    }
    console.log('Database connection closed.');
  });


