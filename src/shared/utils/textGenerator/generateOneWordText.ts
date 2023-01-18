import { arrayWords } from './wordsToPrint'

const selectWord = (arrLength: number) => {
  let randomNum = Math.floor(arrLength * Math.random());
  return arrayWords[randomNum];
}
  
export const generateOneWordText = () => {
    let string = '';
    let word = selectWord(arrayWords.length)
    while(string.length < 70){
      if(string.length + word.length + 1 < 70){
          string = string + word + ' '
      }else{
          break
      }
  }
    return string;
}