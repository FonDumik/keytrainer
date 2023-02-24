import { test, expect } from "vitest";
import { screen } from "shared/utils/test/test-utils";
import InteractableKeyboard from "..";
import { renderWithProviders } from "pages/ClikClik/lib/renderWithRedux";

test("Should be load keyboard on mounting", () => {
  renderWithProviders(<InteractableKeyboard />, {});
  const element = screen.getByTestId("int-keyboard");
  expect(element).toBeInTheDocument();
});
