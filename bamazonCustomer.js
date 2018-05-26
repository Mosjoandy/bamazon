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
        }
    ]).then(answers => {
        console.log("You input ID: " + answers.answer1)
        var chosenProduct;
        for (var i = 0; i < res.length; i++) {
            if (answers.answer1 ===  res[i].id) {
                chosenProduct = res[i].id;   
              
            }
            
        }
        console.log("You want to buy " + chosenProduct);
      
    });

//end of the line
});