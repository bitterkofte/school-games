import { areAllValuesUnique, isAnyElementSame } from "./fineFunctions";

export function questionAddDisableHandler(
  questionText,
  questionType,
  options,
  answer
) {
  if (!questionText.trim()) return true;
  if (
    ["single-choice", "multiple-choice", "sorting"].includes(
      questionType.value
    ) &&
    isAnyElementSame(options)
  )
    return true;
  else if (questionType.value === "single-choice") {
    return !options.some((opt) => opt.trim()) || !answer.trim();
  } else if (questionType.value === "multiple-choice") {
    return (
      !options.some((opt) => opt.trim()) ||
      // !answer.some((a) => a.trim()) ||
      answer.length < 2
    );
  } else if (questionType.value === "sorting") {
    return !options.some((opt) => opt.trim());
  } else if (questionType.value === "matching") {
    return (
      answer.some((pair) => !pair.main.trim() || !pair.pair.trim()) ||
      !areAllValuesUnique(answer, "main")
    );
  } else if (questionType.value === "fill-in-the-blank") {
    const opening = (questionText.match(/\[\[/g) || []).length;
    const closing = (questionText.match(/\]\]/g) || []).length;
    const empty = questionText.match(/\[\[\s*\]\]/g);
    // return answer.some((a) => !a.trim());
    return opening !== closing || empty;
  } else if (questionType.value === "true-false") {
    // return !answer.trim();
    return false;
  } else if (questionType.value === "turkiye-province") {
    return answer === "";
  }
}
