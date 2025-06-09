export const resetTestForm = (
  setQuestionText,
  setOptions,
  setAnswer,
  questionType
) => {
  setQuestionText("");
  if (
    ["single-choice", "multiple-choice", "sorting"].includes(questionType.value)
  ) {
    setOptions(["", "", ""]);
    setAnswer("");
  } else if (questionType.value === "matching") {
    setAnswer([
      { main: "", pair: "" },
      { main: "", pair: "" },
      { main: "", pair: "" },
    ]);
  } else if (questionType.value === "fill-in-the-blank") {
    setAnswer([]);
  } else if (questionType.value === "true-false") {
    setAnswer("Doğru");
  } else if (questionType.value === "turkiye-province") {
    setQuestionText("geçici");
    setAnswer("");
  } else {
    setOptions(["", "", ""]);
    setAnswer("");
  }
};
