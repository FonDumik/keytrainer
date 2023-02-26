import { configureStore } from "@reduxjs/toolkit";
import { InteractiveKeyboardReducer } from "widgets/InteractableKeyboard";
import { InputTextClikClikReducer } from "widgets/InputTextClikClik";
import { headerResultsReducer } from "widgets/HeaderResults/model";
import { sidebarReducer } from "widgets/SidebarClikClik/model";
import { headerReducer } from "widgets/Header";
import { inputCurrentTextReducer } from "features/InputCurrentText";
import { keyboardReducer } from "widgets/Keyboard";
import { configurationTrainingReducer } from "features/ConfigureTraining";
import { timerReducer } from "features/Timer";
import { textContainerReducer } from "entities/TextContainer";

export const reducer = {
  InteractiveKeyboardReducer,
  InputTextClikClikReducer,
  headerResultsReducer,
  sidebarReducer,
  headerReducer,
  inputCurrentTextReducer,
  keyboardReducer,
  configurationTrainingReducer,
  timerReducer,
  textContainerReducer,
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
