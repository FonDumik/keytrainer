import { arrayWords } from './wordsToPrint'

const selectWord = (arrLength: number) => {
  let randomNum = Math.floor(arrLength * Math.random());
  return arrayWords[randomNum];
}
  
export const generateOneWordText = () => {
    let string = '';
    let word = selectWord(arrayWords.length)
    for (let i = 0; i < 70; i += word.length + 1) {
        string = string + word + ' ';
    }
    return string;
}