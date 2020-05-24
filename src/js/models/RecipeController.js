import { IngredientProcessor } from "./IngredientProcessor"
import { DataProcessor } from "./DataProcessor"
import {shortTxt} from "../views/utils"
var Fraction = require('fractional').Fraction
// recipe part
// ["publisher","title" , "source_url",
// "recipe_id", "image_url", "social_rank",
//  "publisher_url", "ingredients"]

// item in recipes part
// ["publisher", "title", "source_url", 
// "recipe_id", "image_url", "social_rank", "publisher_url"]

export class RecipeController {
    constructor(minutes = 45, servings = 4) {
        this.minutes = minutes
        this.servings = servings
        this.dataProcessor = new DataProcessor()
        this.ingredientProcessor = new IngredientProcessor()
    }

    // set rid
    init(rid) {
        this.rid = rid
        return this.dataProcessor.getRecipe(rid).then(
            recipe => {
                this.recipe = recipe
                this.baseIngredients = this.ingredientProcessor.getIngredients(this.recipe.ingredients)
                this.ingredients = this.ingredientProcessor.getIngredients(this.recipe.ingredients)
                this.recipe.ingredients = JSON.parse(JSON.stringify(this.ingredients))
                this.recipe.minutes = this.minutes
                this.recipe.servings = this.servings
                return this
            }
        )
    }

    // save rid to localStorage recipes
    saveRecipe() {
        // read recipes is none -> create recipes
        let recipes = localStorage.getItem("recipes")
        let info = {
            title: shortTxt(this.recipe.title),
            publisher: this.recipe.publisher,
            image_url: this.recipe.image_url,
            recipe_id: this.recipe.recipe_id,
        }
        if (!recipes) {
            localStorage.setItem("recipes", JSON.stringify([info]))
        } else {
            let data = JSON.parse(recipes)
            if (data.map(info_ => info_.recipe_id).includes(info.recipe_id)){
                // delete rid
                data = data.filter(info_ => info_.recipe_id !== info.recipe_id)
                console.log(data)
            } else{
                // add rid
            data.push(info)
            }
            localStorage.setItem("recipes", JSON.stringify(data))
        }
    }

    // delete rid to localStorage recipes
    deleteRecipe(rid) {
        // read recipes delete rid
        let data = JSON.parse(localStorage.getItem("recipes"))
        data = data.filter(info => info.recipe_id !== rid)
        localStorage.setItem("recipes", JSON.stringify(data))
    }

    // modify ingredient
    modifyIngredient(newServings) {
        // new value * multiplier
        let multiplier = new Fraction(newServings).divide(new Fraction(this.servings))
        let outputIngredients = JSON.parse(JSON.stringify(this.baseIngredients))
        outputIngredients.forEach(ingredient => {
            ingredient["value"] = new Fraction(ingredient["value"].numerator,ingredient["value"].denominator)
            ingredient["value"] = ingredient["value"].multiply(multiplier)
            ingredient["value"] = ingredient["value"]
        })
        this.ingredients = outputIngredients
        return JSON.parse(JSON.stringify(outputIngredients))
    }

    // get Liked Recipes
    getLikedRecipes() {
        return JSON.parse(localStorage.getItem("recipes"))
    }

    // get recipe
    getRecipe() {
        return this.recipe
    }


}