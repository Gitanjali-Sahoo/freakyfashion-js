const sqlite3 = require("sqlite3").verbose();

//connect to database
const db = new sqlite3.Database(
  "../product-manager.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.log(err.message);
  }
);

//creating products table:

let sqlProducts = `
CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT,
    product_brand TEXT,
    slug,
    product_price TEXT,
    product_color TEXT,
    product_image TEXT,
    product_sku TEXT,
    product_description,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`;

db.run(sqlProducts, (err) => {
  if (err) {
    return console.error("Error creating products table:", err.message);
  }
  console.log("products table created");
});
