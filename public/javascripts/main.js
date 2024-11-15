const loadProductBtn = document.querySelector("button");
const tableBody = document.querySelector("tbody");

// Function to clear existing rows in the table body
function clearTable() {
  tableBody.innerHTML = ""; // This clears all existing rows
}
//Function to delete a row in product lists
function deleteProduct(productId, tableRow) {
  fetch(`/api/products/${productId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        // If the delete request is successful, remove the row from the table
        tableRow.remove();
      } else {
        console.log("Error deleting product");
      }
    })
    .catch((error) => {
      console.log("Error deleting product:", error);
    });
}

// Function to create a new row for a product
function createProductRow(product, index) {
  const tr = document.createElement("tr");

  // Create and populate <td> elements for each product property

  //adding numbers rows
  const rowsNumber = document.createElement("td");
  rowsNumber.textContent = index + 1;

  tr.appendChild(rowsNumber);

  const tdName = document.createElement("td");
  tdName.textContent = product.productName;
  tr.appendChild(tdName);

  const tdSku = document.createElement("td");
  tdSku.textContent = product.SKU;
  tr.appendChild(tdSku);

  const tdPrice = document.createElement("td");
  tdPrice.textContent = product.productPrice;
  tr.appendChild(tdPrice);

  // Optional actions (e.g., edit/delete icons)
  const tdActions = document.createElement("td");
  tdActions.innerHTML = `
    <a href="#"><i class="bi bi-pencil-square"></i></a>
   <a href="#" class="delete-icon"><i class="bi bi-trash3-fill"></i></a>
  `;
  tr.appendChild(tdActions);

  const deleteIcon = tdActions.querySelector(".delete-icon");

  deleteIcon.addEventListener("click", () => {
    // if (confirm("Are you sure you want to delete this product?")) {
    //   deleteProduct(product.id, tr);
    // }
    if (true) {
      deleteProduct(product.id, tr);
    }
  });

  // Append the new row to the table body
  tableBody.appendChild(tr);
}

// Event listener to load products when the button is clicked
loadProductBtn.addEventListener("click", () => {
  fetch("/api/products")
    .then((response) => response.json())
    .then((products) => {
      // Clear existing rows before loading new data
      clearTable();

      // Create rows for each product and append them to the table
      products.forEach(createProductRow);
    })
    .catch((error) => {
      console.log("Error fetching products:", error);
    });
});

const searchBar = document.querySelector("#search");
searchBar.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    console.log("hello");
  }
});
