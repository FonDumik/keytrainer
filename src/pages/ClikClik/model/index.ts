import { configureStore } from "@reduxjs/toolkit";
import { InteractiveKeyboardReducer } from "widgets/InteractableKeyboard";
import { InputTextClikClikReducer } from "widgets/InputTextClikClik";
import { headerResultsReducer } from "widgets/HeaderResults/model";

export const storeClikClik = configureStore({
  reducer: {
    InteractiveKeyboardReducer,
    InputTextClikClikReducer,
    headerResultsReducer,
  },
});

export type RootState = ReturnType<typeof storeClikClik.getState>;
export type AppDispatch = typeof storeClikClik.dispatch;
