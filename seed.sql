USE bamazondb;

INSERT INTO inventory (department_name, product_name, product_price, product_quantity, product_sales) 
VALUES  ("Toys", "Ball", 15, 100, 0),
        ("Toys", "Lego", 35, 50, 0),
        ("Toys", "Barbie", 20, 80, 0),
        ("Clothing", "Pant", 10, 75, 0),
        ("Clothing", "Shirt", 15, 65, 0),
        ("Clothing", "Hat", 25, 55, 0),
        ("Electronics", "TV", 30, 20, 0),
        ("Electronics", "Radio", 40, 90, 0),
        ("Electronics", "Computer", 100, 10, 0),
        ("Essentials", "Soap", 5, 200, 0),
        ("Essentials", "Brush", 55, 85, 0),
        ("Essentials", "Napkin", 1, 200, 0);

INSERT INTO departments (department_name_ultimate, over_head_costs)
VALUES  ("Toys", 4000),
        ("Clothing", 5000),
        ("Electornics", 6000),
        ("Essentials", 3000);
