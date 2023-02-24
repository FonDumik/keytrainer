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
