DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
use bamazon;
CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50),
	product_sales DECIMAL(10,2) default 0,
	department_name VARCHAR(50),
	price DECIMAL(10,2),
	stock_quantity INT(11),
	PRIMARY KEY (item_id)
);
select * from products;
use bamazon;
create table departments(
department_id INT NOT NULL AUTO_INCREMENT,
department_name varchar(50),
over_head_costs DECIMAL(10,2),
primary key (department_id)
);
select * from departments;

