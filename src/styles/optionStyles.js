export const optionStyles = (showAnswer, isSelected, isCorrectAnswer) => {
  return {
    base:
      !isSelected && !(showAnswer && isCorrectAnswer && !isSelected)
        ? "w-full p-3 border-2 border-neutral-400 rounded-xl transition"
        : "w-full p-3 border-2 rounded-xl transition",
    hoverStyle:
      !showAnswer && !isSelected
        ? "cursor-pointer hover:bg-sky-900"
        : !showAnswer && isSelected
        ? "cursor-pointer hover:bg-sky-600"
        : "cursor-not-allowed",
    selectedStyle: isSelected && !showAnswer ? "bg-sky-700 border-sky-500" : "",
    correctStyle:
      showAnswer && isCorrectAnswer && isSelected
        ? "border-green-600 bg-green-700 font-bold"
        : "",
    incorrectStyle:
      showAnswer && isSelected && !isCorrectAnswer
        ? "border-red-500 bg-red-700"
        : "",
    correct:
      showAnswer && isCorrectAnswer && !isSelected
        ? "border-green-600 text-green-500 font-bold"
        : "",
  };
};
