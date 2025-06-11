export const questionFormer = (questionType, questionText, options, answer) => {
  return {
    type: questionType.value,
    // ...(questionType.value === "single-choice" && {
    //   text: questionText,
    //   options,
    //   answer,
    // }),
    ...(questionType.value === "single-choice" ||
      (questionType.value === "multiple-choice" && {
        text: questionText,
        options: [...options].map((opt, i) => ({
          id: String.fromCharCode(97 + i),
          text: opt,
        })),
        answer: answer,
      })),
    ...(questionType.value === "sorting" && {
      text: questionText,
      options: options.map((opt, i) => ({
        id: (i + 1).toString(),
        text: opt,
      })),
      answer: options.map((opt, i) => (i + 1).toString()),
    }),
    ...(questionType.value === "true-false" && {
      text: questionText,
      answer: answer === "Doğru" ? "True" : "False",
    }),
    ...(questionType.value === "turkiye-province" && {
      text: answer + " ilimiz hangisidir?",
      answer,
    }),
    ...(questionType.value === "matching" && {
      text: questionText,
      answer,
    }),
    ...(questionType.value === "fill-in-the-blank" && {
      text: questionText.replace(/\[\[[^\]]*\]\]/g, "[[blank]]"),
      answer: answer.map((s) => s.trim()),
      // answer: answer.split("|").map((s) => s.trim()), // support multiple blanks
    }),
  };
};
