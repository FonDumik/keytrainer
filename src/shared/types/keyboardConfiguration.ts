export type keyboardConfiguration = {
  content1: string;
  content2?: string | undefined;
  selected: boolean;
  needShift?: string | undefined;
  setType: string;
  positionFor?: string | undefined;
};

export type keyboardCases = {
  downCase: Array<string>;
  upperCase: Array<string>;
  symbols: Array<string>;
};

export interface keyboardCasesKeys {
  downCase: string;
  upperCase: string;
  symbols: string;
}
