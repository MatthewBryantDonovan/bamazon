# Bamazon - CLI Shopping!

Bamazon is a CLI that allows customers to buy items from a mySQL database. 

There are three different clients available with the following menu options.

1. Customer - 

![Customer options Picture](./examples/CustomerOptions.PNG)

2. Manager -

![Manager options Picture](./examples/ManagerOptions.PNG)

3. Supervisor -

![Supervisor options Picture](./examples/SupervisorOptions.PNG)


## Examples of selected options ~

1. Buy item(s) -

Using this option the user can buy products.

![Buy item(s) Picture](./examples/buy.PNG)

2. Shop by department -

Choose a department and buy items from it.

![Shop by department Picture](./examples/buyDept.PNG)

3. View Products for Sale -

View all the items for sale on Bamazon.

![View Products for Sale Picture](./examples/view.PNG)


4. View Low Inventory -

If any product has less than 5 items in stock, they will be displayed.

![View Low Inventory Picture](./examples/low.PNG)


5. Add to Quantity -

Allows managers and supervisors to add quantity to products stock count.

![Add to Quantity Picture](./examples/addQty.PNG)


6. Add New Product -

Allows managers and supervisors to add a new products to Bamazon.

![Add New Product Picture](./examples/newItem.PNG)


7. View Product Sales by Department -

Supervisors may view the sales for each department.

![View Product Sales by Department Picture](./examples/prodSales.PNG)


8. Create New Department -

This allows supervisors to create a new department.

![Create New Department Picture](./examples/newDept.PNG)


9. Exit -

Select 'Exit' to exit Bamazon.

![Exit Picture](./examples/exit.PNG)


## Examples of error handling ~

* #### Not Enough Quantity error 

If there aren't enough of that product in stock this will display.

![Not Enough Quantity error Picture](./examples/buyDept.PNG)

* #### Department already exists error 

Displays when a department already exists.

![Department already exists error  Picture](./examples/deptErr.PNG)

* #### Item not found error 

If an item doesn't exist this error will trigger.

![Item not found Picture](./examples/itemErr.PNG)

* #### New item with new department error 

If a new item is being added, but also has a new department, the new department must be made first!

![New item with new department Picture](./examples/newItemErr.PNG)

