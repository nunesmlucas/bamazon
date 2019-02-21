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

        inquirer
            .prompt([
                {
                    name: "managerOptions",
                    type: "list",
                    message: "Hello, which option would you like to choose from?",
                    choices:
                        ["View Products for Sale",
                            "View Low Inventory",
                            "Add to Inventory",
                            "Add New Product"]
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenOption = answer.managerOptions;
                switch (chosenOption) {
                    case "View Products for Sale":
                        // console.log("In Case View!");
                        showProducts()
                        break;
                    case "View Low Inventory":
                        viewLowInventory()
                        break;
                    case "Add to Inventory":
                        addToInventory()
                        break;
                    case "Add New Product":
                        // showProducts()
                        break;
                }
            });
    });
}

function showProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        var table = new Table({
            head: ['ID', 'Product', 'Department', 'Price', 'Stock #'],
            colWidths: [5, 20, 20, 10, 10]
        });

        for (var i = 0; i < results.length; i++) {
            table.push(
                [results[i].item_id,
                results[i].product_name,
                results[i].department_name,
                "$" + (results[i].price),
                results[i].stock_quantity]
            );
        }
        console.log(table.toString());
    })
    start();
};

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function (err, results) {
        var table = new Table({
            head: ['ID', 'Product', 'Department', 'Price', 'Stock #'],
            colWidths: [5, 20, 20, 10, 10]
        });

        for (var i = 0; i < results.length; i++) {
            table.push(
                [results[i].item_id,
                results[i].product_name,
                results[i].department_name,
                "$" + (results[i].price),
                results[i].stock_quantity]
            );
        }
        console.log(table.toString());
    })
    start();
};

function addToInventory() {
    inquirer
        .prompt([
            {
                name: "choice",
                type: "input",
                message: "What is the item (use ID) you would like to restock?"
            },
            {
                name: "numberToAdd",
                type: "input",
                message: "How many would you like to re-order?"
            },
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query("SELECT * FROM products WHERE item_id = " + answer.choice),
                function (err) {
                    if (err) throw err;

                    // UPDATING HERE ------- 
                    connection.query("UPDATE  FROM products WHERE item_id = " + answer.choice),

                }

            // connection.query(
            //     "UPDATE products SET ? WHERE ?", [
            //         {
            //             stock_quantity: answer.numberToAdd
            //         },
            //         {
            //             item_id: answer.item_id
            //         }]
            //     function (err) {
            //         if (err) throw err;
            //         console.log("Your auction was created successfully!");
            //         // re-prompt the user for if they want to bid or post
            //         start();
            //     }
            // );
        });
}

// function bidAuction() {
//   // query the database for all items being auctioned
//   connection.query("SELECT * FROM auctions", function(err, results) {
//     if (err) throw err;
//     // once you have the items, prompt the user for which they'd like to bid on
//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_name);
//             }
//             return choiceArray;
//           },
//           message: "What auction would you like to place a bid in?"
//         },
//         {
//           name: "bid",
//           type: "input",
//           message: "How much would you like to bid?"
//         }
//       ])
//       .then(function(answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].item_name === answer.choice) {
//             chosenItem = results[i];
//           }
//         }

//         // determine if bid was high enough
//         if (chosenItem.highest_bid < parseInt(answer.bid)) {
//           // bid was high enough, so update db, let the user know, and start over
//           connection.query(
//             "UPDATE auctions SET ? WHERE ?",
//             [
//               {
//                 highest_bid: answer.bid
//               },
//               {
//                 id: chosenItem.id
//               }
//             ],
//             function(error) {
//               if (error) throw err;
//               console.log("Bid placed successfully!");
//               start();
//             }
//           );
//         }
//         else {
//           // bid wasn't high enough, so apologize and start over
//           console.log("Your bid was too low. Try again...");
//           start();
//         }
//       });
//   });
// }
