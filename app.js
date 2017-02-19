var pizzaModule = angular.module('pizza_storage_app', []);

pizzaModule.controller("MainController", ['$scope', 'PizzaStorageService',
                    function($scope, PizzaStorageService){
                        
                        var mc = this;
                        
                        //original toppings
                        mc.topping1="";
                        mc.topping2="";
                        mc.topping3="";
                        mc.topping4="";
                        mc.toppings= [];
                        
                        //edited toppings
                        mc.editTopping1 = "";
                        mc.editTopping2 = "";
                        mc.editTopping3 = "";
                        mc.editTopping4 = "";
                        
                        //chosen toppings
                        mc.selected_topping1;
                        mc.selected_topping2;
                        mc.selected_topping3;
                        mc.selected_topping4;
                        
                        //The main topping options
                        mc.meatToppings = [
                            {
                                unit_name: "Hamburger",
                                unit_code: "ch"
                            },
                            
                            {
                                unit_name: "Pepperoni",
                                unit_code: "pep"
                            },
                            {
                                unit_name: "Bacon",
                                unit_code: "bac"
                            }
                            ];
                        //The vegetarian options    
                        mc.vegetables = [
                            {
                                unit_name:"Mushroom",
                                unit_code:"mush"
                            },
                            {
                                unit_name:"Onion",
                                unit_code: "oni",
                                
                            },
                            {
                                unit_name:"Bell Pepper",
                                unit_code:"bell"
                            }
                            ];
                        //sauce choices
                        mc.sauce = [
                            {
                                unit_name:"Alfredo",
                                unit_code: "alf"
                            },
                            {
                                unit_name: "Marinara",
                                unit_code: "mar"
                            },
                            {
                                unit_name: "Pesto",
                                unit_code: "pest"
                            }
                            ];  
                            
                            mc.crust = [
                                {
                                    unit_name:"Hand Tossed",
                                    unit_code:"hand"
                                },
                                {
                                    unit_name:"Thin Crust",
                                    unit_code:"thin"
                                },
                                {
                                    unit_name:"Deep Dish",
                                    unit_code:"dee"
                                }
                                ];
            //latest information                
            mc.newestData = function(){
                return PizzaStorageService.getData('my-storage');
                
            }   
            
            //update the toppings
            mc.update = function(top4, top1, top2, top3){
                
                if(mc.toppings == null){
                    mc.toppings = [];
                }
                
                var topping = {crust: top4, meat: top1, veggie: top2, sauce: top3};
                mc.toppings.push(topping);
                return PizzaStorageService.setData('my-storage', angular.toJson(mc.toppings));
                
            }
            
            //To be able to edit the forms
            mc.editForm = false;
            mc.showEdit = function(){
                mc.editForm = true;
            }
            mc.hideEdit = function(){
                mc.editForm = false;
            }
            
            mc.editTop1 = function($index){
                mc.toppings = mc.latestData();
                var newTopping = {
                crust: mc.editTopping4.unit_name,
                meat: mc.editTopping1.unit_name,
                veggie: mc.editTopping2.unit_name,
                sauce: mc.editTopping3.unit_name
            
                };
                mc.toppings.splice($index, 1, newTopping);
                
                return PizzaStorageService.setData('my-storage', angular.toJson(mc.toppings));
            }               
            
            //deletes an order
             mc.removeOrder = function($index){
                mc.toppings = mc.newestData();
                mc.toppings.splice($index, 1);
                
                return PizzaStorageService.setData('my-storage', angular.toJson(mc.toppings));
            }    
                           
    }]);
           
           //storage         
    pizzaModule.factory("PizzaStorageService", function($window, $rootScope){
        
        angular.element($window).on('storage', function(event) {
            if(event.key == 'my-storage') {
                $rootScope.$apply();
            }
        })
        
        return{
            setData: function(key, val){
                $window.localStorage && $window.localStorage.setItem(key,val);
                return this;
            },
            getData: function(key){
                
                var val = $window.localStorage && $window.localStorage.getItem(key);
                var data = angular.fromJson(val);
                return data;
            }
        }
    })