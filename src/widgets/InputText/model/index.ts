import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface inputTextState {
    currentText: string,
    timeWrite: number,
    textErrors: number,
    lastLetter: string,
    isStartedLine: boolean,
    isFinishedLine: boolean,
    isTimeStarted: boolean
}

const initialState: inputTextState = {
    currentText: '',
    timeWrite: 0,
    textErrors: 0,
    lastLetter: '',
    isStartedLine: false,
    isFinishedLine: false,
    isTimeStarted: false
}

const inputTextSlice = createSlice({
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
    setTimeWrite(state, action: PayloadAction<number>){
        state.timeWrite = action.payload
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
  }
});

export const { updateCurrentText, 
              updateTextErrors, 
              clearTextErrors, 
              setTimeWrite, 
              setLastLetter, 
              setIsStartedLine,
              setIsFinishedLine, 
              setIsStartedTime } = inputTextSlice.actions

export const inputTextReducer = inputTextSlice.reducer