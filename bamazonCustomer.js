var inquirer = require('inquirer');
var mysql = require("mysql");

// Connection to local db
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazondb"
});

// Initial connection
connection.connect(function(err, res) {
    if (err) throw err;
    console.log("You are connected to BamazonDB\n");
});

// setting up variables for inside the connection query
var chosenProduct;
var chosenQuantity;
var chosenProductPrice;
var chosenProductSalesStart;

readInventory();

// Make function that shows user all inventory
function readInventory() {
    connection.query("SELECT * FROM inventory", function(err, res) {
        if (err) throw err;

        // For loop to display all current products id, name, price, and quantity
        for (var i = 0; i < res.length; i++) {
        console.log("Product: " + res[i].product_name + 
                    " || Price: $" + res[i].product_price + 
                    " || Stock: " + res[i].product_quantity + 
                    " || ID: " + res[i].id + "\n");
        }
        firstSheBang();
    });
}

    // Run the inquire for user
    function firstSheBang() {
        connection.query("SELECT * FROM inventory", function(err, res) {
            if (err) throw err;

        // Ask for user input
        inquirer.prompt([
            {
                // User picks ID from inventory table
            name: "answer1",
            type: "input",
            message: "To purchase, enter product ID"
            },
            {
                // User picks how many of that item they want to buy
            name: "answer2",
            type: "input",
            message: "How many desired?"
            }
        ]).then(answers => {

            // Change answer in to an integer, then match it to the inventory table's id
            for (var i = 0; i < res.length; i++) {
                if (parseInt(answers.answer1) ===  res[i].id) {

                    // set global variables as inventory table items
                    chosenProduct = res[i].product_name;
                    chosenProductQuantity = res[i].product_quantity;
                    chosenProductPrice = res[i].product_price;
    chosenProductSalesStart = res[i].product_sales;
                }
            }

            // Display what user chose to buy
            console.log("Product ID: " + answers.answer1);
            console.log("Buy: " + chosenProduct);
            console.log("Current Stock: " + chosenProductQuantity);
            console.log("====================Processing====================");
            
            // Changing inventory stock of item chosen to subtract desired quantity from total stock
            var newQuantity = (chosenProductQuantity - answers.answer2);
    var newSales = (parseInt(answers.answer2) * chosenProductPrice);
    var totalSales = (chosenProductSalesStart + newSales);
            
            // If user wants to buy more than the current stock
            if (newQuantity < 0) {
                console.log("You cannot buy more than the current stock\n");
                firstSheBang();
            } else {

                connection.query("UPDATE inventory SET ? WHERE ?",
                [
                {
                    product_sales: totalSales
                },
                {
                    product_name: chosenProduct
                }
                ], function (err, res) {
                    console.log("You have spent $" + (parseInt(answers.answer2) * parseInt(chosenProductPrice)));
                });
                // New query to update quantity in inventory table
                connection.query("UPDATE inventory SET ? WHERE ?",
                [
                {
                    product_quantity: newQuantity
                },
                {
                    product_name: chosenProduct
                }
                ], function (err, res) {
                    console.log("You have bought " + answers.answer2 + " " + chosenProduct + "s.");

                    // Display new updated information on bought item
                    console.log("====================Completed Transaction====================");
                    console.log("Product ID: " + answers.answer1);
                    console.log("Product Name: " + chosenProduct);
                    console.log("Updated Stock: " + newQuantity + "\n");
                    secondSheBang();
                });
            }
        });
    });
}

// Function to give choice to user to buy more or end connection
function secondSheBang() {
    inquirer.prompt(
    {
        name: "answer3",
        type: "list",
        message: "Keep shopping?",
        choices: ["Yes", "No"]
    }
    ).then(answers =>  {
        if (answers.answer3 === "Yes") {
        readInventory();
        } else {
        console.log("Thank you for shopping on bamazon")
        connection.end();
        }
    });
}
