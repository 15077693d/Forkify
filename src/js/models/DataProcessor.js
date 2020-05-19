export class DataProcessor{

    async getRecipes(foodName) {
       const resq = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${foodName}`)
       const data = await resq.json()
       const recipes = await data.recipes
       return recipes
    }

    async getRecipe(rid){
        const resq = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${rid}`)
        const data = await resq.json()
        return data.recipe
    }

}

