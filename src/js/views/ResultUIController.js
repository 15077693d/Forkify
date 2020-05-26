import { shortTxt } from "./utils"
export class ResultUIController {
    constructor() {
        this.element = {
            button: document.getElementsByClassName("results__pages")[0],
            list: document.getElementsByClassName("results__list")[0]
        }
        this.maxResult = 10
    }

    setResult(result) {
        // publisher,title,recipe_id,image_url
        this.result = result
    }

    activateResult(rid) {
        // get all results__link item
        let elements = document.getElementsByClassName("results__link")
        elements = Array.from(elements)
        try{
             // get passive result
        let passiveElement = elements.filter(
            element => element.getAttribute("class") === ("results__link results__link--active")
        )[0]
        passiveElement.setAttribute("class", "results__link")
        // get active result
        }catch(err){}
       
        let activeElement = elements.filter(
            element => element.getAttribute("href") === ("#" + rid)
        )[0]
        activeElement.setAttribute("class", "results__link results__link--active")
        this.activeRid = rid
    }
    // ' <li>
    // '     <a class="results__link results__link--active" href="#23456">
    // '         <figure class="results__fig">
    // '             <img src="img/test-1.jpg" alt="Test">
    // '         </figure>
    // '         <div class="results__data">
    // '             <h4 class="results__name">Pasta with Tomato ...</h4>
    // '             <p class="results__author">The Pioneer Woman</p>
    // '         </div>
    // '     </a>
    // ' </li>
    displayList(pageNum) {
        // etc pageNum = 1
        let endi = (pageNum * this.maxResult) - 1
        let starti = endi - (this.maxResult - 1)
        // get result (0,9)
        let result = this.result.slice(starti, endi + 1)
        // result -> htmls
        let htmls = result.map(recipe => {
            let html
            if (recipe.recipe_id === result[0].recipe_id) {
                html = `<li><a class="results__link results__link--active" href="#${recipe.recipe_id}"><figure class="results__fig"><img src="${recipe.image_url}" alt="${recipe.title}"></figure>\<div class="results__data"><h4 class="results__name">${shortTxt(recipe.title)}</h4><p class="results__author">${recipe.publisher}</p></div></a></li>`
            } else {
                html = `<li><a class="results__link" href="#${recipe.recipe_id}"><figure class="results__fig"><img src="${recipe.image_url}" alt="${recipe.title}"></figure>\<div class="results__data"><h4 class="results__name">${shortTxt(recipe.title)}</h4><p class="results__author">${recipe.publisher}</p></div></a></li>`
            }
            return html
        }).reduce((html1, html2) => html1 + html2)
        this.element.list.innerHTML = htmls
    }
    // '  <button class="btn-inline results__btn--prev">
    // '             <svg class="search__icon">
    // '                 <use href="img/icons.svg#icon-triangle-left"></use>
    // '             </svg>
    // '             <span>Page 1</span>
    // '         </button>
    // '         <button class="btn-inline results__btn--next">
    // '             <span>Page 3</span>
    // '             <svg class="search__icon">
    // '                 <use href="img/icons.svg#icon-triangle-right"></use>
    // '             </svg>
    // ' </button>
    displayButton(pageNum) {
        // st 1 page 1
        let lasti = Math.round(this.result.length / this.maxResult)

        if (pageNum === 1) {
            this.element.button.innerHTML = `<button class="btn-inline results__btn--next"><span>Page 2</span><svg class="search__icon"><use href="img/icons.svg#icon-triangle-right"></use></svg></button>`
        } else
            // st 2 page 2 - -2
            if (pageNum > 1 & pageNum < lasti) {
                this.element.button.innerHTML = `<button class="btn-inline results__btn--prev"><svg class="search__icon"><use href="img/icons.svg#icon-triangle-left"></use></svg><span>Page ${pageNum - 1}</span></button><button class="btn-inline results__btn--next"><span>Page ${pageNum + 1}</span><svg class="search__icon"><use href="img/icons.svg#icon-triangle-right"></use></svg></button>`
            }// st 3 page -1
            else {
                this.element.button.innerHTML = `<button class="btn-inline results__btn--prev"><svg class="search__icon"><use href="img/icons.svg#icon-triangle-left"></use></svg><span>Page ${pageNum - 1}</span></button>`
            }
    }

    displayResult(pageNum) {

        this.displayList(pageNum)
        this.displayButton(pageNum)

    }

}
