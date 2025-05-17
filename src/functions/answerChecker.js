export const answerChecker = (type, selectedOptions, answer) => {
  if (selectedOptions.length === 0) {
    return false;
  } else if (type === "single-choice") {
    return selectedOptions[0] === answer;
  } else if (type === "multiple-choice") {
    return (
      selectedOptions.length === answer.length &&
      answer.every((option) => selectedOptions.includes(option))
    );
  } else if (type === "sorting") {
    return JSON.stringify(selectedOptions) === JSON.stringify(answer);
  } else if (type === "true-false") {
    return selectedOptions === answer;
  } else if (type === "turkiye-province") {
    return selectedOptions[0] === answer;
  } else if (type === "matching")
    if (selectedOptions.length !== answer.length) return false;
  return selectedOptions.every(
    (item, i) => answer[i].pair === item
    // (item, i) => answer.find((a) => a.main === item.main)?.pair === item.pair
  );
};
