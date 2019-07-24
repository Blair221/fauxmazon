const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "Stev!eg33",
  database: "fauxmazon_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);

  queryDatabase();
});

function queryDatabase() {
  connection.query("select * from products", function(error, results) {
    if (error) {
      console.log("there was an error making that query");
    }

    console.table(results);

    productPrompt(results);
  });
}

function productPrompt(items) {
  inquirer
    .prompt([
      {
        name: "product_id",
        type: "choice",
        message:
          "What is the id of the product you would like to order? (Exit with an e)",
        validate: function(value) {
          if (!isNaN(value) || value === 'e') {
            return true;
          } 
        }
      }
    ])
    .then(function(value) {
      
      if (value.choice === "e") {
        console.log("See ya later, alligator!");
        process.exit(0);
      }
      var productId = parseInt(value.choice);
      var product = stockCheck(productId, items);

      if (product) {
        inquirer
          .prompt([
            {
              type: "input",
              name: "quantity",
              message: "How many would you like? [Exit with an e]",
              validate: function(value) {
                if (value > 0 || value === "e") {
                  return true;
                }
              }
            }
          ])
          .then(function(value) {
            if (value.quantity === "e") {
              console.log("See ya later, alligator!");
              process.exit(0);
            }
            var quantity = value.quantity;
            if (quantity > product.stock) {
              console.log("There ain't enough of these to go round, sorry bud!");
              queryDatabase();
            } else {
              connection.query(
                "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
                [quantity, product.item_id],
                function(err, res) {
                  // Let the user know the purchase was successful, re-run loadProducts
                  console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
                  queryDatabase();
                }
              );
            }
          });
      }
    });
}


function stockCheck(productId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === productId) {
      // If a matching product is found, return the product
      return inventory[i];
    }
  }
  // Otherwise return null
  return null;
}
