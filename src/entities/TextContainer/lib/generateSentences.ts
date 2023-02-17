const selectSentence = (sentenceArray: string[]) => {
  let randomNum = Math.floor(sentenceArray.length * Math.random());
  return sentenceArray[randomNum];
};

export const generateSentence = (sentenceArray: string[]) => {
  const text = selectSentence(sentenceArray);
  let array = [];
  let splitedArray = text.split(" ");
  let string = "";
  for (let elem of splitedArray) {
    if (string.length + elem.length + 1 < 80) {
      string = string + elem + " ";
    } else {
      array.push(string);
      string = elem + " ";
    }

    if (splitedArray[splitedArray.length - 1] === elem && string.length < 70) {
      array.push(string);
      string = "";
    }
  }
  return array;
};
