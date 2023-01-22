import { sentencesToPrint } from "./sentenceToPrint"

const selectSentence = (arrLength: number) => {
    let randomNum = Math.floor(arrLength * Math.random());
    return sentencesToPrint[randomNum];
}

export const generateSentence = () => {
    const text = selectSentence(sentencesToPrint.length)
    let array = []
    let splitedArray = text.split(' ')
    let string = ''
    for(let elem of splitedArray){
        if(string.length + elem.length+1 < 80){
            string = string + elem + ' '
        }else{
            array.push(string)
            string = elem + ' '
        }

        if(splitedArray[splitedArray.length-1] === elem && string.length < 70){
            array.push(string)
            string = ''
        }
    }
    return array
}