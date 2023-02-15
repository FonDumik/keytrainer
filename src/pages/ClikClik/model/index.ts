import { configureStore } from "@reduxjs/toolkit";
import { InteractiveKeyboardReducer } from "widgets/InteractableKeyboard";
import { InputTextClikClikReducer } from "widgets/InputTextClikClik";
import { headerResultsReducer } from "widgets/HeaderResults/model";
import { sidebarReducer } from "widgets/SidebarClikClik/model";

export const storeClikClik = configureStore({
  reducer: {
    InteractiveKeyboardReducer,
    InputTextClikClikReducer,
    headerResultsReducer,
    sidebarReducer,
  },
});

export type RootState = ReturnType<typeof storeClikClik.getState>;
export type AppDispatch = typeof storeClikClik.dispatch;
