import { IngredientProcessor } from "./IngredientProcessor"
import { DataProcessor } from "./DataProcessor"
// recipe part
// ["publisher","title" , "source_url",
// "recipe_id", "image_url", "social_rank",
//  "publisher_url", "ingredients"]

// item in recipes part
// ["publisher", "title", "source_url", 
// "recipe_id", "image_url", "social_rank", "publisher_url"]

export class Recipe {
    constructor() {
        this.minutes = 45
        this.servings = 4
        this.dataProcessor = new DataProcessor()
        this.ingredientProcessor = new IngredientProcessor()
    }

    // set rid
    init(rid) {
        this.rid = rid
        return this.dataProcessor.getRecipe(rid).then(
            recipe => {
                this.recipe = recipe
                this.ingredients = this.ingredientProcessor.getIngredients(this.recipe.ingredients)
                this.recipe.ingredients = JSON.parse(JSON.stringify(this.ingredients))
                return this
            }
        )
    }

    // save rid to localStorage recipes
    saveRecipe(){
        // read recipes is none -> create recipes
        let recipes = localStorage.getItem("recipes")
        if (!recipes){
            localStorage.setItem("recipes",JSON.stringify({rids:[this.rid]}))
        }else{
            let rids = JSON.parse(recipes)["rids"]
            // add rid
            rids.push(this.rid)
            localStorage.setItem("recipes",JSON.stringify({rids:rids}))
        }
    }

    // delete rid to localStorage recipes
    deleteRecipe(rid){
        // read recipes delete rid
        let rids = JSON.parse(localStorage.getItem("recipes"))["rids"]
        rids = rids.filter(rid_ => rid_!==rid)
        localStorage.setItem("recipes",JSON.stringify({rids:rids}))
    }

    // modify ingredient
    modifyIngredient(newServings){
        // new value * multiplier
        let multiplier = newServings/this.servings
        let outputIngredients = JSON.parse(JSON.stringify(this.ingredients))
        outputIngredients.forEach(ingredient => {
            ingredient["quantity"]*=multiplier
        })
        return outputIngredients
    }

    // get recipe
    getRecipe(){
        return this.recipe
    }

    
}