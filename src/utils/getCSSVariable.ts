export const getCSSVariable = (variable: string): number => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();

  const numericValue = parseFloat(value);

  if (value.endsWith("s") && !value.endsWith("ms")) {
    return numericValue * 1000;
  }

  return numericValue;
};
