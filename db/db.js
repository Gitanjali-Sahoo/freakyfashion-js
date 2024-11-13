// Ladda nödvändiga moduler
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Absolut sökväg till databasen
const dbFilePath = path.resolve(process.cwd(), "./db/product-manager.db");

// Skapa db-objekt - vi använder detta för att kommunicera
// med databasen
const db = new sqlite3.Database(dbFilePath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});

// Exportera db-objektet - detta gör att vi kan importera
// det i andra delar av applikationen.
module.exports = db;
