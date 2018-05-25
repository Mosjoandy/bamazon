DROP DATABASE IF EXISTS bamazondb;

CREATE DATABASE bamazondb;

USE bamazondb;

CREATE TABLE inventory (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    product_price DECIMAL (10,2) NOT NULL,
    product_quantity INTEGER (10) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO inventory (department_name, product_name, product_price, product_quantity) 
VALUES  ("Toys", "Ball", 15, 100),
        ("Toys", "Lego", 35, 50),
        ("Toys", "Barbie", 20, 80),
        ("Clothing", "Pant", 10, 75),
        ("Clothing", "Shirt", 15, 65),
        ("Clothing", "Hat", 25, 55),
        ("Electronics", "TV", 30, 20),
        ("Electronics", "Radio", 40, 90),
        ("Electronics", "Computer", 100, 10),
        ("Essentials", "Soap", 5, 200),
        ("Essentials", "Brush", 55, 85),
        ("Essentials", "Napkin", 1,200);

SELECT * FROM inventory;
