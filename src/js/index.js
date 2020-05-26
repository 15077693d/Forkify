import { RecipeController } from './models/RecipeController'
import { DataProcessor } from './models/DataProcessor'
import { ShoppingListController } from './models/ShoppingListController'

import { ResultUIController } from './views/ResultUIController'
import { ShoppingListUIController } from './views/ShoppingListUIController'
import { LikeUIController } from './views/LikeUIController'
import { RecipeUIController } from './views/RecipeUIController'

// 35477
//localStorage.clear("Shopping_list")

class AppController {
    constructor() {
        this.recipeController = new RecipeController()
        this.dataProcessor = new DataProcessor()
        this.resultUIController = new ResultUIController()
        this.recipeUIController = new RecipeUIController()
        this.likeUIController = new LikeUIController()
        this.shoppingListUIController = new ShoppingListUIController()
        this.DOMString = {
            likeList:".likes__panel",
            search: ".search__btn",
            result: ".results",
            like: ".recipe__love",
            servings: ".recipe__info-buttons",
            add: ".recipe__btn",
            list: ".shopping",
        }
    }

    init() {
        this.searchRecipe("pizza")
        let recipes = this.recipeController.getLikedRecipes()
        let list = ShoppingListController.getList()
        // views
        if (recipes!==null){
            this.likeUIController.displayLikedRecipes(recipes)
        }
        if (list!==null){
            list.forEach(item => this.shoppingListUIController.addItem(item))
        }
    }

    searchRecipe(foodName) {
        // model
        this.dataProcessor.getRecipes(foodName).then(
            recipes => {
                // result
                let rid = recipes[0].recipe_id
                this.resultUIController.setResult(recipes)
                this.resultUIController.displayResult(1)
                this.selectRecipe(rid)
            }
        )
    }

    goPage(num) {
        this.resultUIController.displayResult(parseInt(num))
    }
    //         recipeController1.init("47025").then(recipeController => {
    //             let recipe = recipeController.getRecipe()
    //             RecipeUIController1.setRecipe(recipe)
    //             RecipeUIController1.displayRecipe()

    selectRecipe(rid) {
        try{
            this.resultUIController.activateResult(rid)
        }catch(err){
            
        }
        this.recipeController.init(rid).then(recipeController => {
            // model
            let recipe = recipeController.getRecipe()
            // view
            this.recipeUIController.setRecipe(recipe)
            this.recipeUIController.displayPeople(4)
            this.recipeUIController.displayRecipe()
        }
        )
    }

    addShoppingList() {
        let ingredients = this.recipeController.ingredients
        console.log(ingredients)
        // add shopping list
        ingredients.forEach(ingredient => {
            // model
            let _ingredient = ShoppingListController.addItem(ingredient)
            // view
            this.shoppingListUIController.addItem(_ingredient)
        })
    }

    likeRecipe() {
        // add like recipe 
        // model
        this.recipeController.saveRecipe()
        let _recipes = this.recipeController.getLikedRecipes()
        // views
        this.likeUIController.displayLikedRecipes(_recipes)
    }

    deleteItem(id) {
        // model
        ShoppingListController.deleteItem(parseInt(id))
        this.shoppingListUIController.deleteItem(id)
    }

    modifyItem(id,value){
        ShoppingListController.modifyItem(id,value)
    }

    changeServings(newServings) {
        this.recipeUIController.displayPeople(newServings)
        let ingredients = this.recipeController.modifyIngredient(newServings)
        // displayIngredient
        this.recipeUIController.displayIngredient(ingredients)
    }
}

let appController = new AppController()

const setUpListener = (appController) => {
    // search
    document.querySelector(appController.DOMString.search).addEventListener("click", function () {
        let foodName = document.querySelector('.search__field').value
        appController.searchRecipe(foodName)
    })
    // result
    document.querySelector(appController.DOMString.result).addEventListener("click", function (event) {
        let ridElement = event.path.filter(element => element.localName === "a")[0];
        let pageText = event.srcElement.innerText
        if (ridElement !== undefined) {
            let rid = ridElement.hash.slice(1)
            appController.selectRecipe(rid)
        }
        else if (pageText.includes("Page")) {
            appController.goPage(pageText.slice(5, 6))
        }
    })
    // servings
    document.querySelector(appController.DOMString.servings).addEventListener("click",function(event){
        if (event.srcElement.localName==="svg"|event.srcElement.localName==="use"){
            let newServings;
            if (event.target.outerHTML.includes("minus")){
                newServings = parseInt(document.querySelector(".recipe__info-data--people").textContent)
                newServings-=1
            }
            if (event.target.outerHTML.includes("plus")){
                newServings = parseInt(document.querySelector(".recipe__info-data--people").textContent)
                newServings+=1
            }
            appController.changeServings(parseInt(newServings))
        }
    })
    // like
    document.querySelector(appController.DOMString.like).addEventListener("click", function (event) {
        appController.likeRecipe()
    })
    document.querySelector(appController.DOMString.likeList).addEventListener("click",function(event){
        let ridElement = event.path.filter(element => element.localName === "a")[0];
        let rid = ridElement.hash.slice(1)
        appController.selectRecipe(rid)
    })
    // shopping list
    document.querySelector(appController.DOMString.add).addEventListener("click",function(){
        appController.addShoppingList()
    })
    document.querySelector(appController.DOMString.list).addEventListener("click",function(event){
        if (event.srcElement.localName==="svg"|event.srcElement.localName==="use"){
            let element = event.path.filter(element => element.localName === "li")[0]; 
            appController.deleteItem(element.id.split('_')[1])
        }

        if (event.srcElement.localName==="input"){
            let element = event.path.filter(element => element.localName === "li")[0]; 
            appController.modifyItem(parseInt(element.id.split('_')[1]),
            parseFloat(event.srcElement.value))

        }
    })

}

appController.init()
setUpListener(appController)
 