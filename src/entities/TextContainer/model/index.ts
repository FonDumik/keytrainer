import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateSentence } from "../lib/generateSentences";
import { generateOneWordText } from "../lib/generateOneWordText";
import { generateMultipleWordText } from "entities/TextContainer/lib/generateMultipleWordText";
import { configurationTrainingType } from "shared/types/configurationTraining";
import { arrayWords } from "shared/utils/wordsToPrint";
import { arrayWordsENG } from "shared/utils/wordsToPrintENG";
import { sentencesToPrintENG } from "shared/utils/sentenceToPrintENG";
import { sentencesToPrint } from "shared/utils/sentenceToPrint";

interface textContainerState {
  complexText: string[];
  randomText: string;
}

const initialState: textContainerState = {
  complexText: generateSentence(sentencesToPrint),
  randomText: selectText({ language: "RU", mode: "start" }),
};

function selectText(configuration: configurationTrainingType) {
  if (configuration.language === "RU") {
    if (configuration.mode === "start") {
      return generateOneWordText(arrayWords);
    } else if (configuration.mode === "begin") {
      return generateMultipleWordText(arrayWords);
    }
  } else if (configuration.language === "ENG") {
    if (configuration.mode === "start") {
      return generateOneWordText(arrayWordsENG);
    } else if (configuration.mode === "begin") {
      return generateMultipleWordText(arrayWordsENG);
    }
  }
}

const textContainerSlice = createSlice({
  name: "textContainer",
  initialState,
  reducers: {
    resetComplexText(state, mode: PayloadAction<string>) {
      if (mode.payload === "RU") {
        state.complexText = generateSentence(sentencesToPrint);
      } else if (mode.payload === "ENG") {
        state.complexText = generateSentence(sentencesToPrintENG);
      }
    },
    updateComplexText(state) {
      if (state.complexText.length !== 0) {
        let nextState = state.complexText;
        nextState.shift();
        state.complexText = nextState;
      }
    },
    updateRandomText(state, action: PayloadAction<configurationTrainingType>) {
      state.randomText = selectText(action.payload);
    },
    setRandomTextTraining(state, action: PayloadAction<string>) {
      state.randomText = action.payload;
    },
  },
});

export const {
  updateComplexText,
  resetComplexText,
  updateRandomText,
  setRandomTextTraining,
} = textContainerSlice.actions;

export const textContainerReducer = textContainerSlice.reducer;
