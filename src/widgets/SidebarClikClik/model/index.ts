import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type configText = {
  isCapitalLetters: boolean;
  isNumbers: boolean;
  isPunctuation: boolean;
  language: "Ru" | "En";
};

export type configKeyboard = {
  language: "Ru" | "En";
  isSoundError: boolean;
  keyHints: boolean;
};

interface configSidebarState {
  configurationText: configText;
  configurationKeyboard: configKeyboard;
  isOpenSidebar: boolean;
}

const initialState: configSidebarState = {
  configurationText: {
    language: "Ru",
    isCapitalLetters: false,
    isNumbers: false,
    isPunctuation: false,
  },
  configurationKeyboard: {
    language: "Ru",
    isSoundError: false,
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
    toggleSidebar(state, action: PayloadAction<boolean>) {
      state.isOpenSidebar = action.payload;
    },
    changeLanguage(state, action: PayloadAction<"En" | "Ru">) {
      state.configurationKeyboard.language = action.payload;
      state.configurationText.language = action.payload;
    },
  },
});

export const {
  toggleCapitalLetters,
  toggleNumbers,
  togglePunctuation,
  toggleShowHints,
  toggleSoundError,
  toggleSidebar,
  changeLanguage,
} = sidebarSlice.actions;

export const sidebarReducer = sidebarSlice.reducer;
