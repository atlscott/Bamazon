CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(150) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT NOT NULL,
	PRIMARY KEY (item_id)
);

-- Insert data into the 'products' table --
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
("Atlanta United Jersey","Fan Gear",120.00,25),
("Atlanta Falcons Jersey","Fan Gear",100.00,35),
("Atlanta United T-Shirt","Fan Gear",29.99,50),
("Atlanta Falcons T-Shirt","Fan Gear",24.99,50),
("Atlanta Braves Jersey","Fan Gear",85.00,25),
("Atlanta Braves T-Shirt","Fan Gear",22.00,40),
("Atlanta United Polo","Fan Gear",49.99,30),
("Atlanta Falcons Polo","Fan Gear",49.99,30),
("Atlanta Braves Polo","Fan Gear",49.99,30),
("Atlanta Braves Hat","Fan Gear",15.99,0);