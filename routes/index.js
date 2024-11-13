var express = require("express");
var router = express.Router();
const db = require("../db/db");

/* GET home page */
router.get("/", function (req, res) {
  const sql = `
    SELECT id,
      product_name as productName,
      product_brand as productBrand,
      slug as slug,
      product_price as productPrice,
      product_color as productColor,
      product_image as productImage,
        product_sku as SKU,
      product_description as productDescription,
      created_at AS createdAt
    FROM products
  `;

  db.all(sql, [], function (err, rows) {
    if (err) {
      console.log("Error running query:", err.message);
    }

    // Get current date for comparing product age
    const currentDate = new Date();

    // Loop through each product and asign the isNew tag to product
    rows.forEach((product) => {
      const productCreatedAt = new Date(product.createdAt);
      const timeDifference = currentDate - productCreatedAt;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

      // Check if the product is created within the last 7 days
      product.isNew = daysDifference < 7;
    });

    // Render the page with the updated products
    res.render("index", {
      title: "Products",
      products: rows,
    });
  });
});

// Dynamic Product details page for a specific product

router.get("/products/:slug", function (request, response) {
  const productSlug = request.params.slug;

  // Query to get all products
  const allProductsSql = `
    SELECT id,
      product_name as productName,
      product_brand as productBrand,
      slug as slug,
      product_price as productPrice,
      product_color as productColor,
      product_image as productImage,
        product_sku as SKU,
      product_description as productDescription,
      created_at AS createdAt
    FROM products
  `;

  // Query to get the specific product by slug
  const productDetailsSql = `
    SELECT id,
      product_name as productName,
      product_brand as productBrand,
      slug as slug,
      product_price as productPrice,
      product_color as productColor,
      product_image as productImage,
      product_sku as SKU,
      product_description as productDescription,
      created_at AS createdAt
    FROM products
    WHERE slug = ?
  `;

  // Run the query for all products
  db.all(allProductsSql, [], function (err, products) {
    if (err) {
      console.log("Error fetching products:", err.message);
      return response.status(500).send("Error fetching products");
    }

    // Run the query for the specific product
    db.get(productDetailsSql, [productSlug], (err, productDetails) => {
      if (err) {
        console.log("Error fetching product details:", err.message);
        return response.status(500).send("Error fetching product details");
      }

      if (!productDetails) {
        // Handle case if product with the given slug is not found
        return response.status(404).send("Product not found");
      }

      // Render the product-details page with both products list and product details
      response.render("product-details", {
        title: "Product Details",
        products: products, // Send the list of all products
        productDetails: productDetails, // Send the specific product details
      });
    });
  });
});

//checkout page
router.get("/checkout", function (request, response) {
  response.render("checkout", { title: "Checkout" });
});

//Admin page
router.get("/admin/products", function (request, response) {
  response.render("admin/products/index", { title: "Administration" });
});

// New product
router.get("/admin/products/new", function (request, response) {
  response.render("admin/products/new", { title: "Administration" });
});

router.get("/api/products", function (request, response) {
  const products = `
    SELECT id,
      product_name as productName,
      product_brand as productBrand,
      slug as slug,
      product_price as productPrice,
      product_color as productColor,
      product_image as productImage,
        product_sku as SKU,
      product_description as productDescription,
      created_at AS createdAt
    FROM products
  `;
  db.all(products, function (error, rows) {
    if (error) {
      console.log("Error fetching products:", err.message);
      return response.status(500).send("Error fetching products");
    }
    response.json(rows);
  });
});

//Deleting a product from products table
router.delete("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const deletedProducts = `DELETE FROM products WHERE id = ?`;
  db.run(deletedProducts, [productId], (err) => {
    if (err) {
      console.error("Error deleting product from database:", err);
      res.status(500).json({ error: "Failed to delete product" });
      return;
    }
    // If no rows were affected, the ID did not exist
    if (this.changes === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json({ message: "Product deleted successfully" });
    }
  });
});

module.exports = router;
