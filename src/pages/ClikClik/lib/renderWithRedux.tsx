import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

//store
import { storeClikClik } from "pages/ClikClik/model";

export function renderWithProviders(
  ui: React.ReactElement,
  { preloadedState = {}, store = storeClikClik, ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
