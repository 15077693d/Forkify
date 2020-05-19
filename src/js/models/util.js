var Fraction = require('fractional').Fraction
// IngredientProcessor 
const indexOfChar = (char,string) => {
    let indexs = []
    for(let i =0; i< string.length;i++){
        // add same ti indexs
        if (string[i]===char){
            indexs.push(i)
        }   
    }
    return indexs
}

const removeTxt = (txt,starti,endi) => {
    let result = ""
    let addFlag = true
        for (let i =0; i<txt.length;i++){
            if (starti.includes(i)){addFlag = false}  // (index not add
            if (addFlag){
                result+=txt[i]} // add
            if (endi.includes(i)){addFlag = true}  // after )index add
        }

    return result
}

const txt2Number = txt => {
    if(txt.includes("-")){
        return txt2Number(txt.split("-")[0])
    }
    if (/\d+\/\d+/.test(txt)){
    return new Fraction(txt)
    }
   
    if (/^-{0,1}\d+$/.test(txt)){
        return new Fraction(txt)
    }

    return txt
   
}

export {indexOfChar,removeTxt,txt2Number};

