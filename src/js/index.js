import { RecipeController } from './models/RecipeController'
import { DataProcessor } from './models/DataProcessor'
import { ShoppingListController } from './models/ShoppingListController'

import { ResultUIController } from './views/ResultUIController'
import { ShoppingListUIController } from './views/ShoppingListUIController'
import { LikeUIController} from './views/LikeUIController'
import { RecipeUIController } from './views/RecipeUIController'


class AppController{
    constructor(){
        this.DOMString = {
            search
        }
    }
}

// 35477
localStorage.clear("Shopping_list")
let recipeController1 = new RecipeController()
let DataProcessor1 = new DataProcessor()
let ResultUIController1 = new ResultUIController()
let RecipeUIController1 = new RecipeUIController()
let ShoppingListUIController1 = new ShoppingListUIController()
let LikeUIController1 = new LikeUIController()

DataProcessor1.getRecipes("pasta").then(
    recipes => {
        // result
        let rid = recipes[1].recipe_id
        ResultUIController1.setResult(recipes)
        ResultUIController1.displayResult(1)
        ResultUIController1.activateResult(rid)

        // get recipe
        recipeController1.init("47025").then(recipeController => {
            let recipe = recipeController.getRecipe()
            RecipeUIController1.setRecipe(recipe)
            RecipeUIController1.displayRecipe()

            // add like recipe 
            // model
            recipeController.saveRecipe()
            let _recipes = recipeController.getLikedRecipes()
            // views
            LikeUIController1.displayLikedRecipes(_recipes)
            // renew 
            let newServings = 8
            RecipeUIController1.displayPeople(newServings)
            let ingredients = recipeController.modifyIngredient(newServings)
            // displayIngredient
            RecipeUIController1.displayIngredient(ingredients)

            // add shopping list
            ingredients.forEach(ingredient => {
                let _ingredient = ShoppingListController.addItem(ingredient)
                ShoppingListUIController1.addItem(_ingredient)
            })
            // delete 3-6
            for(let i = 3;i<7;i++){
                ShoppingListController.deleteItem(i)
                ShoppingListUIController1.deleteItem(i)
            }
        })
    }
)
