import {ShoppingListController} from './models/ShoppingListController'
import {RecipeController} from './models/RecipeController'
// 35477

let recipeController1 = new RecipeController()

recipeController1.init("35477").then(recipeController2 => {
    // add recipe
    recipeController2.saveRecipe()
    // get ingredient
    let recipe = recipeController2.getRecipe()
    console.log(recipe.ingredients[0])

    ShoppingListController.addItem(recipe.ingredients[0])
    ShoppingListController.modifyItem(1,10)
    ShoppingListController.deleteItem(2)
})
