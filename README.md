# bamazon

## Overview

### Customer
This program is designed for terminal use only. Using the command "node bamazonCustomer.js, will give the user a list of avaiable products on the bamazon database and an option to buy. When the user selects a product ID from the list, they can then select a quantity. The user will be displayed their purchase.

* * *
<img src="https://cdn.discordapp.com/attachments/446103300069392385/451531610043711489/unknown.png" width="480px">

* * * 

### Manager
The manager mode program is terminal only as well, using the comand node bamazonManager.js. 5 options are provided for the manager to view inventory, see what products have low stock, add stock to products, add items to the inventory, and a quit option.

* * *

<img src="https://cdn.discordapp.com/attachments/446103300069392385/451533121146322954/unknown.png" width="480px">

* * * 

## Process

### Customer
- The user inputs "node bamazonCustomer.js".
- The user is presented with an option to purchase based on product ID.
- Once the user inputs a product ID, another prompt will appear asking how much of the product they would like to buy.
- When the quantity is chosen, a receipt will print, showing which item they wanted to buy, how much it cost, and its before/after stock.
- The user is finally given an option to continue shopping or quit.

<img src="https://cdn.discordapp.com/attachments/446103300069392385/451533910275260427/unknown.png" width="480px">

* * *

### Manager
- The user inputs "node bamazonManager.js".
- The user is presented with 5 options:
    - Current Stock - which displays all the products available, their names, quantities, id's, prices, and sales.
    - Low Inventory Products - displays which products are below a certain threshold; in our current database the threshold is 10.
    - Add To Inventory - gives a new prompt to the user to input which product ID they want to modify, then add a desired stock quantity.
    - Add New Product - creates a new id, prompts for name, department, price, and quantity.
    - Exit option.

<img src="https://cdn.discordapp.com/attachments/446103300069392385/451535315858096128/unknown.png" width="480px">

* * * 

## Techonologies

### NPM's

- Inquirer 5.2.0 - [NPM Inquirer](https://www.npmjs.com/package/inquirer)
- MySQL 2.15.0 - [NPM MySQL](https://www.npmjs.com/package/mysql)

