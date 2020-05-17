import { indexOfChar, removeTxt, txt2Number } from "./util"

export class IngredientProcessor {
    constructor() {
        // ingredientData example 
        // 0: "4 1/2 cups (20.25 ounces) unbleached high-gluten, bread, or all-purpose flour, chilled"
        // 1: "1 3/4 (.44 ounce) teaspoons salt"
        // 2: "1 teaspoon (.11 ounce) instant yeast"
        // 3: "1/4 cup (2 ounces) olive oil (optional)"
        // 4: "1 3/4 cups (14 ounces) water, ice cold (40F)"
        // 5: "Semolina flour OR cornmeal for dusting"
        this.units = ["tablespoon","ounce","teaspoon","cup","pound","tablespoons","ounces",
                    "teaspoons","cups","pounds","tbsp","oz","tsp","pound","kg","g","jars","jar",
                "packages","package"]
    }

    getIngredients(ingredientData) {
        let ingredients = []
        // 3: "1/4 cup (2 ounces) olive oil (optional)"
        ingredientData.forEach(data =>{
            // step 1
            // "1/4 cup  olive oil "
            let ingredientStr = data
            // ( indexs
            let starti = indexOfChar("(", ingredientStr)
            // ) indexs
            let endi = indexOfChar(")", ingredientStr)
            // remove (*) -> "1/4 cup  olive oil "
            let step1String = removeTxt(ingredientStr, starti, endi)

            // ["1", "3/4", "", "teaspoons", "salt"]

            // step 2 
            // [1.75, "teaspoons", "salt"]
            let step2List = step1String.split(" ").filter(txt => txt !== "")
            step2List = step2List.map(txt => { return txt2Number(txt) })
            // step 3 
            // { value:1.75, unit:"teaspoons", item:"salt"}
            let step3Object = {item:[]}
            let sum = 0
            step2List.forEach(item => { if (typeof item === "number") { sum += item } 
                                        else if(this.units.includes(item)) { step3Object["unit"] = item }
                                        else {step3Object.item.push(item)}})
            step3Object["value"] = sum
            let itemStr = ""
            step3Object['item'].forEach(item => itemStr+=(item+" "))
            step3Object['item'] = itemStr
            if (step3Object.value!==0){
                   ingredients.push(step3Object)
            }
        })
        return ingredients
    }
}
