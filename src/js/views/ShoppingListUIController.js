export class ShoppingListUIController {
    constructor() {
        this.element = document.getElementsByClassName("shopping__list")[0]
    }

    addItem(ingredient) {
        ingredient.value = ingredient.value.numerator / ingredient.value.denominator
        // step
        // 0.68 -> 0.69,0.70
        // 0.01
        // 100 -> 101,102
        // 001
        let step = ""
        let flag = ingredient.value.toString()
        for (let i = 0; i < flag.length; i++) {
            if (i===(flag.length-1)){
                step+=1
                break
            }else{
                 if (flag[i]==='.'){
                step+="."
            }else{
                step+="0"
            }
            }  
            if (i==2){
                step+=1
                break
            }
        }
        const extraHTML = `<li id="shopping_${ingredient.id}"class="shopping__item"><div class="shopping__count"><input type="number" value="${ingredient.value}" step="${step}"><p>${ingredient.unit}</p></div><p class="shopping__description">${ingredient.item}</p><button class="shopping__delete btn-tiny"><svg><use href="img/icons.svg#icon-circle-with-cross"></use></svg></button></li>`
        this.element.innerHTML += extraHTML
    }

    deleteItem(id) {
        document.getElementById(`shopping_${id}`).remove()
    }
}