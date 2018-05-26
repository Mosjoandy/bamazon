var inquirer = require('inquirer');
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazondb"
});

connection.connect(function(err, res) {
    if (err) throw err;
    console.log("You are connected to BamazonDB");
});


connection.query("SELECT * FROM inventory", function(err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
    console.log("Product: " + res[i].product_name + " || Price: $" + res[i].product_price + " || Stock: " + res[i].product_quantity + " || ID: " + res[i].id + "\n");
    }

    inquirer.prompt([
        {
        name: "answer1",
        type: "input",
        message: "To purchase, enter product ID"
        },
        {
        name: "answer2",
        type: "input",
        message: "How many desired?"
        }
    ]).then(answers => {
        var chosenProduct;
        var chosenQuantity;
        for (var i = 0; i < res.length; i++) {
            if (parseInt(answers.answer1) ===  res[i].id) {
                chosenProduct = res[i].product_name;
                chosenQuantity = res[i].product_quantity;
            }
        }
        console.log("Product ID: " + answers.answer1);
        console.log("Buy: " + chosenProduct);
        console.log("Stock: " + chosenQuantity);
        console.log("====================Processing====================");
                connection.query("UPDATE product_quantity SET ? WHERE ?",
                [
                {
                    product_quantity: (product_quantity - chosenQuantity)
                },
                {
                    product_name: chosenProduct
                }
                ], function (err, res) {
                    console.log("====================Completed Transaction====================");
                    console.log("Product: " + chosenProduct);
                    console.log("Stock: " + res[i].product_quantity);
                }
            );
        
    });

//end of the line
});
