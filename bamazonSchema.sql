DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
    price DECIMAL(9,2) NOT NULL DEFAULT 0,
    stock_quantity INT NOT NULL DEFAULT 0,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Backpack', 'Apparel', 40.00, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Beanie', 'Apparel', 25.00, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Shirts', 'Mens Clothing', 35.00, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Sun Glasses', 'Womens Clothing', 40.00, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Shoes', 'Mens Clothing', 60.00, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Sheets', 'Bedroom', 80.00, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Pillows', 'Bedroom', 40.00, 80);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Xbox', 'Electronics', 300.00, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Controller', 'Electronics', 60.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Video Game', 'Electronics', 60.00, 100);

SELECT * FROM products;
