import { arrayWords } from './wordsToPrint'

const selectWord = (arrLength: number) => {
  let randomNum = Math.floor(arrLength * Math.random());
  return arrayWords[randomNum];
}
  
export const generateMultipleWordText = () => {
    let string = '';
    while(string.length < 70){
        let word = selectWord(arrayWords.length)
        if(string.length + word.length + 1 < 70){
            string = string + word + ' '
        }else{
            break
        }
    }
    return string;
}