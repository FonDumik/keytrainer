import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface inputTextState {
    currentText: string,
    timeWrite: number,
    textErrors: number,
    lastLetter: string,
    isStartedLine: boolean,
    isFinishedLine: boolean,
    isTimeStarted: boolean,
    wasError: boolean
}

const initialState: inputTextState = {
    currentText: '',
    timeWrite: 0,
    textErrors: 0,
    lastLetter: '',
    isStartedLine: false,
    isFinishedLine: false,
    isTimeStarted: false,
    wasError: false
}

const inputCurrentTextSlice = createSlice({
  name: 'inputText',
  initialState,
  reducers: {
    updateCurrentText(state, action: PayloadAction<string>){
        state.currentText = action.payload
    },
    updateTextErrors(state){
        state.textErrors++
    },
    clearTextErrors(state){
        state.textErrors = 0
    },
    setLastLetter(state, action: PayloadAction<string>){
      state.lastLetter = action.payload
    },
    setIsStartedLine(state, action: PayloadAction<boolean>){
      state.isStartedLine = action.payload
    },
    setIsFinishedLine(state, action: PayloadAction<boolean>){
      state.isFinishedLine = action.payload
    },
    setIsStartedTime(state, action: PayloadAction<boolean>){
      state.isTimeStarted = action.payload
    },
    setWasError(state, action: PayloadAction<boolean>){
      state.wasError = action.payload
    }
  }
});

export const { updateCurrentText, 
              updateTextErrors, 
              clearTextErrors, 
              setLastLetter, 
              setIsStartedLine,
              setIsFinishedLine, 
              setIsStartedTime,
              setWasError } = inputCurrentTextSlice.actions

export const inputCurrentTextReducer = inputCurrentTextSlice.reducer