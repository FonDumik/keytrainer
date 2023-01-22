const selectWord = (arrayWords: string[]) => {
  let randomNum = Math.floor(arrayWords.length * Math.random());
  return arrayWords[randomNum];
}
  
export const generateMultipleWordText = (arrayWords: string[]) => {
    let string = '';
    while(string.length < 70){
        let word = selectWord(arrayWords)
        if(string.length + word.length + 1 < 80){
            string = string + word + ' '
        }else{
            break
        }
    }
    return string;
}