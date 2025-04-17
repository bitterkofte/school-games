export const answerChecker = (type, selectedOptions, answer) => {
  if (selectedOptions.length === 0) {
    return false;
  } else if (type === "single-choice") {
    return selectedOptions[0] === answer;
  } else if (type === "multiple-choice") {
    return selectedOptions.every((option) => answer.includes(option));
  } else if (type === "sorting") {
    return JSON.stringify(selectedOptions) === JSON.stringify(answer);
  } else if (type === "true-false") {
    return selectedOptions === answer;
  } else if (type === "turkiye-province") {
    return selectedOptions[0] === answer;
  }
};
