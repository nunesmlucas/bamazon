var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Password1",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like buys
    // console.log(results);

    // instantiate
    var table = new Table({
      head: ['ID', 'Product', 'Department', 'Price', 'Stock #'],
      colWidths: [5, 20, 20, 10, 10]
    });
    inquirer
      .prompt([
        {
          name: "choice",
          type: "input",
          choices: function () {
            // console.log(results.length);
            for (var i = 0; i < results.length; i++) {
              table.push(
                [results[i].item_id,
                results[i].product_name,
                results[i].department_name,
                "$"+ (results[i].price),
                results[i].stock_quantity]
              );
            }
            console.log(table.toString());
          },
          message: "What item (by ID) would you like to purchase?"
        },
        {
          name: "numberOfItems",
          type: "input",
          message: "How many would you like to purchase?"
        }
      ])
      .then(function (answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === parseInt(answer.choice)) {
            chosenItem = results[i];
            // console.log(chosenItem);
          }

        }

        // determine if bid was high enough
        if (chosenItem.stock_quantity >= answer.numberOfItems) {
          var differenceNum = chosenItem.stock_quantity - answer.numberOfItems;
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: differenceNum
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("Updated stock amount and purchased " + answer.numberOfItems + " x " + chosenItem.product_name + ".\n"
              + "Total Cost: $" + (chosenItem.price * answer.numberOfItems));
              start();
            }
          );
        }
        else {
          console.log("Sorry we don't have enough stock for that order. Please try another number!");
          start();
        }
      });
  });
};
