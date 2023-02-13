export const configureStroke = (stroke: string) => {
  const text = stroke
    .slice(0, -1)
    .split("")
    .map((elem) => {
      return {
        content: elem,
        correctlyPressed: false,
        typoPressed: false,
        isSelected: false,
      };
    });
  return text;
};
