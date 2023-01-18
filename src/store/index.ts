import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "../components/header/model"
import inputTextReducer from "../components/inputText/model"
import keyboardReducer from "../components/keyboard/model"
import configurationTrainingReducer from "../components/configureTraining/model"
import timerReducer from "../components/Timer/model"

export const store = configureStore({
    reducer: {
        headerReducer,
        inputTextReducer,
        keyboardReducer,
        configurationTrainingReducer,
        timerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch