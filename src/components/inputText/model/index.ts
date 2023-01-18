import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { generateOneWordText } from '../../../shared/textGenerator/generateOneWordText'
import { generateMultipleWordText } from '../../../shared/textGenerator/generateMultipleWordText'
import { configurationTrainingType } from '../../../types/configurationTraining';

interface inputTextState {
    currentText: string,
    randomText: string,
    timeWrite: number,
    textErrors: number,
    lastLetter: string,
    isStartedLine: boolean,
    isFinishedLine: boolean,
    isTimeStarted: boolean
}

const initialState: inputTextState = {
    currentText: '',
    randomText: selectText({language: "RU", mode: "start"}),
    timeWrite: 0,
    textErrors: 0,
    lastLetter: '',
    isStartedLine: false,
    isFinishedLine: false,
    isTimeStarted: false
}

initialState.lastLetter = initialState.randomText[0]

const inputTextSlice = createSlice({
  name: 'inputText',
  initialState,
  reducers: {
    updateCurrentText(state, action: PayloadAction<string>){
        state.currentText = action.payload
    },
    updateRandomText(state, action: PayloadAction<configurationTrainingType>){
        state.randomText = selectText(action.payload)
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
    }
  }
});

export const {updateCurrentText, updateRandomText, updateTextErrors, clearTextErrors, setTimeWrite, setLastLetter, setIsStartedLine, setIsFinishedLine, setIsStartedTime} = inputTextSlice.actions

export default inputTextSlice.reducer

function selectText(configuration: configurationTrainingType){
    if(configuration.language === 'RU'){
      if(configuration.mode === 'start'){
        return generateOneWordText()
      }else if(configuration.mode === 'begin'){
        return generateMultipleWordText()
      }else if(configuration.mode === 'training'){
        return generateMultipleWordText()
      } 
    }
}