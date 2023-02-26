import { arrayWords } from "shared/utils/wordsToPrint";
import { arrayWordsENG } from "shared/utils/wordsToPrintENG";
import { configText } from "shared/types/sidebarConfig";
import { symbols } from "../config/symbols";
import { symbolsEn } from "../config/symbolsEn";

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

const getPunctuation = (isPunctuation: boolean, symbolsArray: string[]) => {
  if (isPunctuation && Math.random() >= 0.4) {
    return selectWord(symbolsArray);
  } else {
    return "";
  }
};

export const generateText = (config: configText, language: "Ru" | "En") => {
  const { isNumbers, isCapitalLetters, isPunctuation } = config;
  let arrayWordsText: string[];
  let symbolsText: string[];
  if (language === "Ru") {
    arrayWordsText = arrayWords;
    symbolsText = symbols;
  } else if (language === "En") {
    arrayWordsText = arrayWordsENG;
    symbolsText = symbolsEn;
  }
  let string = "";
  while (string.length < 80) {
    let word: string;

    if (isNumbers && Math.random() <= 0.4) {
      word = getRandomNumber() + getPunctuation(isPunctuation, symbolsText);
    } else {
      word =
        getCapitalLetter(selectWord(arrayWordsText), isCapitalLetters) +
        getPunctuation(isPunctuation, symbolsText);
    }

    if (string.length + word.length + 1 < 80) {
      string = string + word + " ";
    } else {
      break;
    }
  }
  return string;
};
