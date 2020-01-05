var mysql = require("mysql");
var inquirer = require("inquirer");
const ct = require('console.table');

var department = "";
var departments = [];

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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();

});

function afterConnection() {
    department = "";
    departments = [];
    inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        choices: ["Buy item(s)", "Shop in department", "Exit"],
        name: "runThis"
    }, ]).then(function (inq) {

        switch (inq.runThis) {
            case ("Buy item(s)"):
                buyItem();
                break;
            case ("Shop in department"):
                shopDepartment();
                break;
            case ("Exit"):
                connection.end();
                break;
        }
    });
}

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
                if (res1[0].stock > inq.amount) {
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

                            afterConnection();
                        });
                } else {
                    console.log("There are not enough of that item available to purchase!");
                    afterConnection();
                }
                if (err) throw err;
            });
        });
    });
};

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