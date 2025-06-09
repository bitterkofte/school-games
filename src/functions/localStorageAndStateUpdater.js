export const localStorageAndStateUpdater = (variableName, value, setState) => {
  localStorage.setItem(variableName, JSON.stringify(value));
  setState(value);
};
