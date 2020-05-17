export class ShoppingListController {
    static addItem(ingredient) {
        let data = localStorage.getItem("Shopping_list")
        // list === null -> set item []
        if (!data) {
            ingredient.id = 0
            localStorage.setItem("Shopping_list", JSON.stringify( [ingredient] ))
        } else {
            let list = JSON.parse(data)
            // id = last item.id +1
            let id = list[list.length-1].id + 1
            ingredient.id = id
            list.push(ingredient)
            localStorage.setItem("Shopping_list", JSON.stringify(list ))
        }
    }

    static deleteItem(id) {
        let list = JSON.parse(localStorage.getItem("Shopping_list"))
        // filter id === id_
        let newList = list.filter(ingredient => ingredient.id !== id)
        localStorage.setItem("Shopping_list", JSON.stringify(newList))
    }

    static modifyItem(id, value){
        let list = JSON.parse(localStorage.getItem("Shopping_list"))
        // change value
        let newList = list.map(ingredient => {
            if (ingredient.id===id){
                ingredient.value = value
                return ingredient
            }else{
                return ingredient
            }
        })
        localStorage.setItem("Shopping_list", JSON.stringify(newList))
    }
}