DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL auto_increment,
  item VARCHAR(100) NULL,
  department VARCHAR(100) NULL,
  price DECIMAL(65,2) NULL,
  stock int NULL,
  PRIMARY KEY (id)
);