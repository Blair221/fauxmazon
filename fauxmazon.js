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
});

connection.query("select * from products", function(error, results) {
  if (error) {
    console.log("there was an error making that query");
  }
  
  
  console.table(results);

  
  inquirer
    .prompt([
      {
        name: "product_id",
        type: "number",
        message: "What is the id of the product you would like to order?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          } else {
            console.log('\nmake sure to input a number!');     
            return false;
          }
        }
      },
      {
        name: "product_quant",
        type: "number",
        message: "How many would you like to order?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          } else {
            console.log('\nmake sure to input a number!');
            return false;
          }
        }
      }
    ])
    .then(function(answers) {
      console.log(`The product you want to order is id: ${answers.product_id}`);
      console.log(`and you want to order ${answers.product_quant} of them`);
      for (let i = 0; i < results.length; i++) {
          if (answers.product_id === results[i].item_id){
          let element = results[i];
          console.log(element);
          }
      }
    });
});
