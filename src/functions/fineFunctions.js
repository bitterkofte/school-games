export const isAnyElementEmpty = (arr) => {
  return arr.some((opt) => opt.trim() === "");
};

export const isAnyElementSame = (arr) => {
  const uniqueElements = new Set(arr.map((opt) => opt.trim().toLowerCase()));
  return uniqueElements.size !== arr.length;
};

export const areAllValuesUnique = (arr, value) =>
  new Set(arr.map((item) => item[value])).size === arr.length;
