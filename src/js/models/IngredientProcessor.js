var Fraction = require('fractional').Fraction
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

        this.units = {
            tablespoon: "tbsp", ounce: "oz", teaspoon: "tsp",
            cup: "cup", pound: "pound", tablespoons: "tbsp", ounces: "ounce",
            teaspoons: "tbsp", cups: "cup", pounds: "pound", tbsp: "tbsp",
            oz: "oz", tsp: "tsp", pound: "pound", kg: "kg", g: "g", jars: "jar", jar: "jar",
            packages: "pkg", package: "pkg",cloves:'clove',whole:"whole"
        }

        this.useless = ["weight","extra"]
    }

    getIngredients(ingredientData) {
        let ingredients = []
        // 3: "1/4 cup (2 ounces) olive oil (optional)"
        ingredientData.forEach(data => {
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
            // [1/3/4, "teaspoons", "salt"]
            let step2List = step1String.split(" ").filter(txt => txt !== "")
            step2List = step2List.map(txt => { return txt2Number(txt) })
            // step 3 
            // { value:1/3/4, unit:"teaspoons", item:"salt"}
            let step3Object = { item: [] }
            let sum = new Fraction(0)
            step3Object["unit"] = ""

            step2List.forEach(item => {
                if (item.constructor.name === "Fraction") { sum = sum.add(item) }
                else if (Object.keys(this.units).includes(item.match(/\w+/)[0].toLowerCase())) {step3Object["unit"] = this.units[item.match(/\w+/)[0].toLowerCase()] }
                else { step3Object.item.push(item) }
            })
            step3Object["value"] = sum
            let itemStr = ""
            step3Object['item'].forEach(item => itemStr += (item.toLowerCase() + " "))
            step3Object['item'] = itemStr
            if (!step3Object.value.equals(new Fraction(0))) {
                ingredients.push(step3Object)
            }
        })
        return ingredients
    }
}
