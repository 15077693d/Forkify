var Fraction = require('fractional').Fraction
export class RecipeUIController {
    constructor() {
        this.element = {
            figure: document.getElementsByClassName("recipe__fig")[0],
            details: document.getElementsByName("recipe__details")[0],
            ingredients: document.getElementsByClassName("recipe__ingredient-list")[0],
            direction: document.getElementsByClassName("recipe__directions")[0],
            people: document.getElementsByClassName("recipe__info-data--people")[0]
        }
    }

    setRecipe(recipe) {
        // ["publisher","title" , "source_url",
        // "recipe_id", "image_url", "social_rank",
        //  "publisher_url", "ingredients"]
        this.recipe = recipe
    }


    displayRecipe(){   
        // displayFigure!!!!
        // <img src="img/test-1.jpg" alt="Tomato" class="recipe__img">
        // <h1 class="recipe__title">
        //     <span>Pasta with tomato cream sauce</span>
        // </h1>
        this.element.figure.innerHTML = `<img src="${this.recipe.image_url}" alt="${this.recipe.title}" class="recipe__img"><h1 class="recipe__title"><span>${this.recipe.title}</span></h1>`
        // displayIngredient!!!
        this.displayIngredient(this.recipe.ingredients) 
        // displayDirection!!!
        this.element.direction.innerHTML=`<h2 class="heading-2">How to cook it</h2><p class="recipe__directions-text">This recipe was carefully designed and tested by<span class="recipe__by">${this.recipe.title}</span>. Please check out directions at their website.</p><a class="btn-small recipe__btn" href="${this.recipe.source_url}" target="_blank"><span>Directions</span><svg class="search__icon"><use href="img/icons.svg#icon-triangle-right"></use></svg>`    
    }

    displayPeople(newServings){
        this.element.people.textContent = newServings
    }

    displayIngredient(ingredients) {
        // if ingredient is null this.recipe.ingredients
        let html = ""
        for (let i = 0; i < ingredients.length; i++) {
            let subHTML = `<li class="recipe__item"><svg class="recipe__icon"><use href="img/icons.svg#icon-check"></use></svg><div class="recipe__count">${new Fraction(ingredients[i].value.numerator,ingredients[i].value.denominator)}</div><div class="recipe__ingredient"><span class="recipe__unit">${ingredients[i].unit}</span> ${ingredients[i].item}</div></li>`
            html += subHTML
        }
        this.element.ingredients.innerHTML = html
    }  
}