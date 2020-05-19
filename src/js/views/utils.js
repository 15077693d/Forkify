const shortTxt = txt => {
    let words = txt.split(" ")
    if (words.length>3){
        return `${words[0]} ${words[1]} ${words[2]} ...`
    }else{
        return txt
    }
}

export {shortTxt};