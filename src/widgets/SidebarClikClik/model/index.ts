import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type configText = {
  isCapitalLetters: boolean;
  isNumbers: boolean;
  isPunctuation: boolean;
};

export type configKeyboard = {
  isSoundError: boolean;
  showHands: boolean;
  keyHints: boolean;
};

interface configSidebarState {
  language: string;
  configurationText: configText;
  configurationKeyboard: configKeyboard;
  isOpenSidebar: boolean;
}

const initialState: configSidebarState = {
  language: "Ru",
  configurationText: {
    isCapitalLetters: false,
    isNumbers: false,
    isPunctuation: false,
  },
  configurationKeyboard: {
    isSoundError: false,
    showHands: false,
    keyHints: true,
  },
  isOpenSidebar: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleCapitalLetters(state) {
      state.configurationText.isCapitalLetters =
        !state.configurationText.isCapitalLetters;
    },
    toggleNumbers(state) {
      state.configurationText.isNumbers = !state.configurationText.isNumbers;
    },
    togglePunctuation(state) {
      state.configurationText.isPunctuation =
        !state.configurationText.isPunctuation;
    },
    toggleShowHints(state) {
      state.configurationKeyboard.keyHints =
        !state.configurationKeyboard.keyHints;
    },
    toggleSoundError(state) {
      state.configurationKeyboard.isSoundError =
        !state.configurationKeyboard.isSoundError;
    },
    toggleShowHands(state) {
      state.configurationKeyboard.showHands =
        !state.configurationKeyboard.showHands;
    },
    toggleSidebar(state, action: PayloadAction<boolean>) {
      state.isOpenSidebar = action.payload;
    },
  },
});

export const {
  toggleCapitalLetters,
  toggleNumbers,
  togglePunctuation,
  toggleShowHands,
  toggleShowHints,
  toggleSoundError,
  toggleSidebar,
} = sidebarSlice.actions;

export const sidebarReducer = sidebarSlice.reducer;
