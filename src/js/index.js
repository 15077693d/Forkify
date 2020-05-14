// import string from './models/Search'
// //import {add as a, multiply as m, ID} from './views/searchView'
// import * as searchView from './views/searchView'

// console.log(searchView.add(searchView.ID,100))


async function getMeals(food){
    try {
        const data = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${food}`)
        let item = await data.json()
        console.log(item)
        return item
    } catch(error) {
        alert(error)
    }
}

getMeals("pizza")
console.log("123")