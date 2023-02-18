import { configText } from "widgets/SidebarClikClik/model";
import { symbols } from "../config/symbols";

const selectWord = (arrayWords: string[]) => {
  let randomNum = Math.floor(arrayWords.length * Math.random());
  return arrayWords[randomNum];
};

const getRandomNumber = () => {
  const num = Math.floor(Math.random() * 999);
  return String(num);
};

const getCapitalLetter = (word: string, isCapital: boolean) => {
  if (isCapital && Math.random() > 0.5) {
    let firstLetter = word[0];
    return firstLetter.toUpperCase() + word.slice(1);
  } else {
    return word;
  }
};

const getPunctuation = (isPunctuation: boolean) => {
  if (isPunctuation && Math.random() >= 0.4) {
    return selectWord(symbols);
  } else {
    return "";
  }
};

export const generateText = (config: configText, arrayWords: string[]) => {
  const { isNumbers, isCapitalLetters, isPunctuation } = config;
  let string = "";
  while (string.length < 70) {
    let word: string;

    if (isNumbers && Math.random() <= 0.4) {
      word = getRandomNumber() + getPunctuation(isPunctuation);
    } else {
      word =
        getCapitalLetter(selectWord(arrayWords), isCapitalLetters) +
        getPunctuation(isPunctuation);
    }

    if (string.length + word.length + 1 < 80) {
      string = string + word + " ";
    } else {
      break;
    }
  }
  return string;
};
