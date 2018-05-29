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
    console.log("You are in Manager mode");
    nexusBuildsProbes();
});

// Manager controller menu
function nexusBuildsProbes() {
    inquirer.prompt([
        {
        name: "overLord",
        type: "list",
        message: "Select an option:",
        choices: ["Current Stock", "Low Inventory Products", "Add To Inventory", "Add New Product", "Exit"]
        }
    ]).then(answers => {
        switch(answers.overLord) {
            case "Current Stock":
            readInventory();
            break;

            case "Low Inventory Products":
            needMorePylons();
            break;

            case "Add To Inventory":
            buildingMorePylons();
            break;
            
            case "Add New Product":
            buildCyberneticsCore();
            break;

            case "Exit":
            abortMission();
            break;
        }
    });
}

// Make function that shows user all inventory
function readInventory() {
    connection.query("SELECT * FROM inventory", function(err, res) {
        if (err) throw err;

        console.log("====================Processing====================");
        console.log("====================Completed=====================");
        // For loop to display all current products id, name, price, and quantity
        for (var i = 0; i < res.length; i++) {
        console.log("Product: " + res[i].product_name + " || Price: $" + res[i].product_price + " || Stock: " + res[i].product_quantity + " || ID: " + res[i].id + "\n");
        }
        nexusBuildsProbes()
    });
}

function needMorePylons() {
    connection.query("SELECT * FROM inventory WHERE product_quantity", function(err, res) {
        if (err) throw err;

        console.log("====================Processing====================");
        console.log("====================Completed=====================");
var sufficientProducts;
        // For loop to check if product quantity is below a threshold (10)
        for (var i = 0; i < res.length; i++) {
            if (res[i].product_quantity <= 10 ) {
                sufficientProducts = res[i].product_name;
                // Display to manager which items match the criteria above
                console.log("\nProducts with low stock \n")
                console.log("Name: " + res[i].product_name + " || Stock: " + res[i].product_quantity + "\n");
            }
        }
        if (sufficientProducts === "") {
            console.log("\nAll Products have sufficient inventory\n")
        }
        nexusBuildsProbes()
    });
}

// Run the inquire for Manager
function buildingMorePylons() {
    connection.query("SELECT * FROM inventory", function(err, res) {
        if (err) throw err;

    // Ask for Manager input
    inquirer.prompt([
        {
            // Manager picks ID from inventory table
        name: "answer1",
        type: "input",
        message: "To add to inventory, enter product ID"
        },
        {
            // Manager picks how many of that item they want to modify
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
            }
        }

        // Display what manager chose to modify
        console.log("Product ID: " + answers.answer1);
        console.log("Product Name: " + chosenProduct);
        console.log("Current Stock: " + chosenProductQuantity);
        console.log("====================Processing====================");
        
        // Changing inventory stock of item chosen to add desired quantity
        var newQuantity = (chosenProductQuantity + parseInt(answers.answer2));
        
        // If manager wants to buy more than the current stock
        if (newQuantity < 0) {
            console.log("You cannot modify the stock to be negative, so you must not be a real manager!\n");
            connection.end();
        } else {

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
                console.log("You have added " + answers.answer2 + " " + chosenProduct + "s to the product inventory.")

                // Display new updated information on modified item
                console.log("====================Completed====================");
                console.log("Product ID: " + answers.answer1);
                console.log("Product Name: " + chosenProduct);
                console.log("Updated Stock: " + newQuantity + "\n");
                nexusBuildsProbes()
            });
        }
    });
    });
}

// Function that ends connection
function abortMission() {
    console.log("Exiting Manager Mode");
    connection.end();
}