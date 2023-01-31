import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateSentence } from "shared/utils/textGenerator/generateSentences";
import { generateOneWordText } from "shared/utils/textGenerator/generateOneWordText";
import { generateMultipleWordText } from "shared/utils/textGenerator/generateMultipleWordText";
import { configurationTrainingType } from "shared/types/configurationTraining";
import { arrayWords } from "shared/utils/textGenerator/wordsToPrint";
import { arrayWordsENG } from "shared/utils/textGenerator/wordsToPrintENG";
import { sentencesToPrintENG } from "shared/utils/textGenerator/sentenceToPrintENG";
import { sentencesToPrint } from "shared/utils/textGenerator/sentenceToPrint";
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
