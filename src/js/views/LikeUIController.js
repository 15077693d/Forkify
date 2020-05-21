export class LikeUIController{
    constructor(){
        this.element = document.getElementsByClassName("likes__list")[0]
    }

    //     title
    // publisher
    // image_url
    // recipe_id
    displayLikedRecipes(recipes){
        let html = ""
        recipes.forEach(recipe => {
            let subHTML = `<li><a class="likes__link" href="#${recipe.recipe_id}"><figure class="likes__fig"><img src="${recipe.image_url}" alt="Test"></figure><div class="likes__data"><h4 class="likes__name">${recipe.title}</h4><p class="likes__author">${recipe.publisher}</p></div></a></li>`
            html+=subHTML
        });
        this.element.innerHTML = html
    }
}