import {ShoppingList} from './models/ShoppingList'
import {Recipe} from './models/Recipe'
// 35477

let recipe1 = new Recipe()

recipe1.init("35477").then(recipe => {
    // get ingredient
    let recipe_ = recipe.getRecipe()
    console.log(recipe_)
    ShoppingList.addItem(recipe_.ingredients[0])
    ShoppingList.modifyItem(1,10)
    ShoppingList.deleteItem(2)
})
