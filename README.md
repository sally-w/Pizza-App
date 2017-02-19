# Pizza Storage Application

### What For:
This app was created to teach me how to create an app that would use local storage, as well as how to edit something that is already in storage.  

#### How To:
* Using the pull-down menu, choose the toppings and sauces that are desired on the pizza.
* Once the toppings are chosen, click the add button and the pizza will be saved into local storage.
* If you want to change your order without creating a new order, click the edit button and you will be allowed to change the order.
* If you would rather delete the order instead, simply hit the delete pizza button, and the pizza that you created will be removed.

#### Coding
The hardest part of this application for me was as follows:
```
 mc.toppings.splice($index, 1, newTopping);
                
                return PizzaStorageService.setData('my-storage', angular.toJson(mc.toppings));
```
and
```
                mc.toppings.splice($index, 1);
                
                return PizzaStorageService.setData('my-storage', angular.toJson(mc.toppings));
```