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

--created departments
CREATE TABLE departments (
  id INT NOT NULL auto_increment,
  department VARCHAR(100) NULL,
  over_head_costs DECIMAL(65,2) NOT NULL,
  PRIMARY KEY (id)
);

--added product_sales to track sales
ALTER TABLE departments
  ADD product_sales DECIMAL(65,2) NOT NULL;


--added initial values for departments
INSERT INTO departments (department, over_head_costs, product_sales)
VALUES ("ps4", 250, 0),("gamecube", 50, 0),("xbox1", 250, 0),("switch", 250, 0),("PC", 175, 0);
