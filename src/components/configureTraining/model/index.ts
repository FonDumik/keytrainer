import { configurationTrainingType } from "../../../types/configurationTraining";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export function setNewTextConfiguration(configuration: configurationTrainingType){
    if(configuration.language === 'RU'){
        if(configuration.mode === 'start'){
            return 'Русский стартовый'
        }else if(configuration.mode === 'begin'){
            return 'Русский начальный'
        }else if(configuration.mode === 'training'){
            return 'Русский тренировка'
        }
    }
}

interface configurationTrainingState{
    configuration: configurationTrainingType,
    configurationText: string
}

const initialState: configurationTrainingState = {
    configuration: {
        language: "RU",
        mode: "start"
    },
    configurationText: 'Русский стартовый'
}

const configurationTrainingSlice = createSlice({
  name: 'configurationTraining',
  initialState,
  reducers: {
    updateConfigurationTraining(state, action: PayloadAction<configurationTrainingType>){
        state.configuration = action.payload
    },
    updateConfigurationText(state, action: PayloadAction<configurationTrainingType>){
        state.configurationText = setNewTextConfiguration(action.payload)
    }
  }
});

export const {updateConfigurationTraining, updateConfigurationText} = configurationTrainingSlice.actions

export default configurationTrainingSlice.reducer