DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50),
	product_sales DECIMAL(10,2),
	department_name VARCHAR(50),
	price DECIMAL(10,2),
	stock_quantity INT(11),
	PRIMARY KEY (item_id)
);