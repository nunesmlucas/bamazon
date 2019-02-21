DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
    price DECIMAL(9,2) NOT NULL DEFAULT 0,
    stock_quantity DECIMAL(9,2) NOT NULL DEFAULT 0,
    PRIMARY KEY(id)
);
