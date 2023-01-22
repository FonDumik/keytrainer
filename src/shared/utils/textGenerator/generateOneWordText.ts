const selectWord = (arrayWords: string[]) => {
  let randomNum = Math.floor(arrayWords.length * Math.random());
  return arrayWords[randomNum];
}
  
export const generateOneWordText = (arrayWords: string[]) => {
    let string = '';
    let word = selectWord(arrayWords)
    while(string.length < 70){
      if(string.length + word.length + 1 < 80){
          string = string + word + ' '
      }else{
          break
      }
  }
    return string;
}