-- DROP DATABASE IF EXISTS bamazondb;

-- CREATE DATABASE bamazondb;

USE bamazondb;

-- CREATE TABLE inventory (
--     id INT NOT NULL AUTO_INCREMENT,
--     department_name VARCHAR(30) NOT NULL,
--     product_name VARCHAR(30) NOT NULL,
--     product_price DECIMAL (10,2) NOT NULL,
--     product_quantity INTEGER (10) NOT NULL,
--     product_sales INTEGER (10),
--     PRIMARY KEY (id)
-- );

SELECT * FROM inventory;

-- CREATE TABLE departments (
--     id INT NOT NULL AUTO_INCREMENT,
--     department_name_ultimate VARCHAR(30) NOT NULL,
--     over_head_costs INTEGER(30) NOT NULL,
--     PRIMARY KEY (id)
-- );

SELECT * FROM departments