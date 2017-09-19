USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50),
	department_name VARCHAR(50),
	price DECIMAL(10,2),
	PRIMARY KEY (item_id)
);