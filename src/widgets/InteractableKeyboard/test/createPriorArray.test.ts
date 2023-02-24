import { textInputConfig } from "shared/types/textInputConfig";
import { expect, test, describe } from "vitest";
import { createPriorArray } from "../lib/createPriorArray";

const mockWord: textInputConfig[] = [
  {
    content: "?",
    correctlyPressed: false,
    typoPressed: false,
    isSelected: false,
    isTypo: true,
  },
  {
    content: "?",
    correctlyPressed: false,
    typoPressed: false,
    isSelected: false,
    isTypo: true,
  },
  {
    content: "g",
    correctlyPressed: false,
    typoPressed: false,
    isSelected: false,
    isTypo: true,
  },
  {
    content: "g",
    correctlyPressed: false,
    typoPressed: false,
    isSelected: false,
    isTypo: true,
  },
  {
    content: "g",
    correctlyPressed: false,
    typoPressed: false,
    isSelected: false,
    isTypo: false,
  },
  {
    content: "?",
    correctlyPressed: false,
    typoPressed: false,
    isSelected: false,
    isTypo: true,
  },
  {
    content: "?",
    correctlyPressed: false,
    typoPressed: false,
    isSelected: false,
    isTypo: true,
  },
  {
    content: "?",
    correctlyPressed: false,
    typoPressed: false,
    isSelected: false,
    isTypo: true,
  },
  {
    content: "g",
    correctlyPressed: false,
    typoPressed: false,
    isSelected: false,
    isTypo: true,
  },
  {
    content: "l",
    correctlyPressed: false,
    typoPressed: false,
    isSelected: false,
    isTypo: true,
  },
];

describe("Function should return array with objects", () => {
  test("Correct output of function", () => {
    expect(createPriorArray(mockWord)).toEqual([
      { content: "?", priority: 1 },
      { content: "g", priority: 3 },
      { content: "l", priority: 3 },
    ]);
    expect(createPriorArray(mockWord)).not.toBeUndefined();
  });
});
