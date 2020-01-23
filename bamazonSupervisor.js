var mysql = require("mysql");
var inquirer = require("inquirer");
const ct = require('console.table');

var department = "";
var departments = [];

//Connection info.
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

// Establish connection to database.
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();

});

// After connected run BamazonSupervisor client.
function afterConnection() {
    department = "";
    departments = [];
    inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        choices: ["Buy item(s)", "Shop by department", "View Products for Sale", "View Low Inventory", "Add to Quantity", "Add New Product", "View Product Sales by Department", "Create New Department", "Exit"],
        name: "runThis"
    }, ]).then(function (inq) {

        switch (inq.runThis) {
            case ("Buy item(s)"):
                buyItem();
                break;
            case ("Shop by department"):
                shopDepartment();
                break;
            case ("Exit"):
                console.log("Thanks for using Bamazon!");
                connection.end();
                break;
            case ("View Products for Sale"):
                viewProducts();
                break;
            case ("View Low Inventory"):
                lowInventory();
                break;
            case ("Add to Quantity"):
                addToQuantity();
                break;
            case ("Add New Product"):
                addNewProduct();
                break;
            case ("View Product Sales by Department"):
                viewSalesByDept();
                break;
            case ("Create New Department"):
                createNewDept();
                break;

        }
    });
}

// Allow the user to buy an item.
function buyItem() {
    connection.query("SELECT * FROM products " + department, function (err, res) {
        //console.log(stmt.sql);

        if (err) throw err;
        console.table(res);
        inquirer.prompt([{
            type: "input",
            message: "Please enter the item ID that you would like to buy?",
            name: "item"
        }, {
            type: "input",
            message: "Please enter the amount of that item you would like to buy?",
            name: "amount"
        }]).then(function (inq) {

            connection.query("SELECT * FROM products WHERE ?", [{
                id: inq.item
            }], function (err, res1) {
                if (res1[0] != undefined) {
                    if (res1[0].stock >= inq.amount) {
                        connection.query("UPDATE products SET stock = stock - ? WHERE ?",
                            [
                                parseInt(inq.amount),
                                {
                                    id: inq.item
                                }
                            ],
                            function (err, res2) {
                                if (err) throw err;
                                if (inq.amount > 1) {
                                    console.log(inq.amount + " unit of " + res1[0].item + " has been purchased for $" + (inq.amount * res1[0].price) + " !");
                                } else {
                                    console.log(inq.amount + " units of " + res1[0].item + " have been purchased for $" + (inq.amount * res1[0].price) + " !");
                                }
                                connection.query("UPDATE departments SET product_sales = product_sales + ? WHERE ? ",
                                    [
                                        (inq.amount * res1[0].price),
                                        {
                                            department: res1[0].department
                                        }
                                    ],
                                    function (err, res) {
                                        if (err) throw err;
                                    });
                                afterConnection();
                            });
                    } else {
                        console.log("There are not enough of that item available to purchase!");
                        afterConnection();
                    }
                } else {
                    console.log("That item doesn't exist! Please try a different item ID!");
                    afterConnection();
                }
                if (err) throw err;
            });
        });
    });
}

// Allow the user to shop by department.
function shopDepartment() {
    connection.query("SELECT DISTINCT department FROM products", function (err, res3) {
        if (err) throw err;

        for (let index = 0; index < res3.length; index++) {
            departments.push(res3[index].department);
        }

        inquirer.prompt({
            type: "list",
            message: "Which department would you like to shop in?",
            choices: departments,
            name: "dept"
        }).then(function (inq) {
            department = "WHERE department = '" + inq.dept + "'";
            buyItem();
        });

    });
}

//List every available item: the item IDs, names, prices, and quantities.
function viewProducts() {
    connection.query("SELECT * FROM products " + department, function (err, res) {
        //console.log(stmt.sql);
        if (err) throw err;
        console.table(res);
        afterConnection();
    });
}

//List all items with an inventory count lower than five.
function lowInventory() {
    connection.query("SELECT * FROM products " + department + "WHERE stock <= 5", function (err, res) {
        //console.log(stmt.sql);
        if (err) throw err;
        console.table(res);
        afterConnection();
    });
}

//Add more quantity to any item currently in the store.
function addToQuantity() {
    connection.query("SELECT * FROM products " + department, function (err, res) {
        //console.log(stmt.sql);
        if (err) throw err;
        console.table(res);
        inquirer.prompt([{
            type: "input",
            message: "Please enter the item ID that you would like to add quantity to?",
            name: "item"
        }, {
            type: "input",
            message: "Please enter the quantity that you would like to add?",
            name: "amount"
        }]).then(function (inq) {

            connection.query("SELECT * FROM products WHERE ?", [{
                id: inq.item
            }], function (err, res1) {
                connection.query("UPDATE products SET stock = stock + ? WHERE ?",
                    [
                        parseInt(inq.amount),
                        {
                            id: inq.item
                        }
                    ],
                    function (err, res2) {
                        if (err) throw err;
                        if (inq.amount > 1) {
                            console.log(inq.amount + " unit of " + res1[0].item + " has been added to the stock!");
                        } else {
                            console.log(inq.amount + " units of " + res1[0].item + " have added to the stock!");
                        }

                        afterConnection();
                    });
                if (err) throw err;
            });
        });
    });
}

//Add a completely new product to the store.
function addNewProduct() {
    inquirer.prompt([{
        type: "input",
        message: "Please enter the item name?",
        name: "itemName"
    }, {
        type: "input",
        message: "What department does this item belong to?",
        name: "itemDept"
    }, {
        type: "input",
        message: "What is the price of the item?",
        name: "itemPrice"
    }, {
        type: "input",
        message: "How many units of the item are in stock?",
        name: "itemStock"
    }]).then(function (inq) {

        connection.query("SELECT DISTINCT department FROM products", function (err, res3) {
            if (err) throw err;

            for (let index = 0; index < res3.length; index++) {
                departments.push(res3[index].department);
            }

            if (departments.includes(inq.itemDept)) {
                connection.query("INSERT INTO products (item, department, price, stock) VALUES (?, ?, ?, ?);", [
                    inq.itemName,
                    inq.itemDept,
                    inq.itemPrice,
                    inq.itemStock
                ], function (err, res1) {
                    if (err) throw err;
                    if (inq.itemStock > 1) {
                        console.log(inq.itemStock + " units of " + inq.itemName + " have been added to the " +
                            inq.itemDept + " department at $" + inq.itemPrice + " per unit.");
                    } else {
                        console.log(inq.itemStock + " unit of " + inq.itemName + " has been added to the " +
                            inq.itemDept + " department at $" + inq.itemPrice + " per unit.");
                    }
                    afterConnection();
                });
            } else {
                console.log("Please check the spelling of the department in the case it already exists, if not, please add the new department before adding this item!");
                afterConnection();
            }

        });

    });
}

//View the sales of each department.
function viewSalesByDept() {
    connection.query("SELECT *, product_sales - over_head_costs as total_profit  FROM departments " + department, function (err, res) {
        if (err) throw err;
        console.table(res);
        afterConnection();
    });
}

//Create a new department.
function createNewDept() {

    inquirer.prompt([{
        type: "input",
        message: "Please enter the department name?",
        name: "deptName"
    }, {
        type: "input",
        message: "What is the departments 'Over Head Costs'?",
        name: "deptOverHead"
    }, ]).then(function (inq) {

        connection.query("SELECT DISTINCT department FROM departments", function (err, res3) {
            if (err) throw err;

            for (let index = 0; index < res3.length; index++) {
                departments.push(res3[index].department);
            }

            if (!departments.includes(inq.deptName)) {
                connection.query("INSERT INTO departments (department, over_head_costs, product_sales) VALUES (?, ?, " + 0 + ");", [
                    inq.deptName,
                    inq.deptOverHead
                ], function (err, res1) {
                    if (err) throw err;
                    console.log("A department with the name '" + inq.deptName + "' has been added with an 'Over Head Cost' of $" +
                        inq.deptOverHead + ".");
                    afterConnection();
                });

            } else {
                console.log(" That department already exists! Please check the spelling of the department in the case it shouldn't exist.");
                afterConnection();
            }

        });

    });
}