import {RecipeUIController} from './views/RecipeUIController'
import {RecipeController} from './models/RecipeController'
import {DataProcessor} from './models/DataProcessor'
import {ResultUIController} from './views/ResultUIController'
// 35477

let recipeController1 = new RecipeController()
let DataProcessor1 =  new DataProcessor()
let ResultUIController1 = new ResultUIController()
let RecipeUIController1 = new RecipeUIController()
DataProcessor1.getRecipes("pasta").then(
    recipes=> {
        // result
        let rid = recipes[1].recipe_id
        ResultUIController1.setResult(recipes)
        ResultUIController1.displayResult(1)
        ResultUIController1.activateResult(rid)

        // get recipe
        recipeController1.init("47025").then(recipeController =>{
            let recipe = recipeController.getRecipe()
            RecipeUIController1.setRecipe(recipe)
            RecipeUIController1.displayRecipe()

            // renew 
            let newServings = 8
            RecipeUIController1.displayPeople(newServings)
            let ingredients = recipeController.modifyIngredient(newServings)
            // displayIngredient
            RecipeUIController1.displayIngredient(ingredients)
        })
    }
)
