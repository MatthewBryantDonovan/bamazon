# Bamazon - CLI Shopping!

Bamazon is a CLI that allows customers to buy items from a mySQL database. 

There are three different clients available with the following menu options.

1. Customer - 

![Customer options Picture](./Examples/CustomerOptions.PNG)

2. Manager -

![Manager options Picture](./Examples/ManagerOptions.PNG)

3. Supervisor -

![Supervisor options Picture](./Examples/SupervisorOptions.PNG)


## Examples of selected options ~

1. Buy item(s) -

Using this option the user can buy products.

![Buy item(s) Picture](./Examples/buy.PNG)

2. Shop by department -

Choose a department and buy items from it.

![Shop by department Picture](./Examples/buyDept.PNG)

3. View Products for Sale -

View all the items for sale on Bamazon.

![View Products for Sale Picture](./Examples/view.PNG)


4. View Low Inventory -

If any product has less than 5 items in stock, they will be displayed.

![View Low Inventory Picture](./Examples/low.PNG)


5. Add to Quantity -

Allows managers and supervisors to add quantity to products stock count.

![Add to Quantity Picture](./Examples/addQty.PNG)


6. Add New Product -

Allows managers and supervisors to add a new products to Bamazon.

![Add New Product Picture](./Examples/newItem.PNG)


7. View Product Sales by Department -

Supervisors may view the sales for each department.

![View Product Sales by Department Picture](./Examples/prodSales.PNG)


8. Create New Department -

This allows supervisors to create a new department.

![Create New Department Picture](./Examples/newDept.PNG)


9. Exit -

Select 'Exit' to exit Bamazon.

![Exit Picture](./Examples/exit.PNG)


## Examples of error handling ~

* #### Not Enough Quantity error 

If there aren't enough of that product in stock this will display.

![Not Enough Quantity error Picture](./Examples/buyDept.PNG)

* #### Department already exists error 

Displays when a department already exists.

![Department already exists error  Picture](./Examples/deptErr.PNG)

* #### Item not found error 

If an item doesn't exist this error will trigger.

![Item not found Picture](./Examples/itemErr.PNG)

* #### New item with new department error 

If a new item is being added, but also has a new department, the new department must be made first!

![New item with new department Picture](./Examples/newItemErr.PNG)

