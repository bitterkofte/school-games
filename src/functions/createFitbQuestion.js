import { toast } from "sonner";

export const createFitbQuestion = (txt) => {
  const newText = txt;

  // Count how many [[ are being typed
  const openBrackets = (newText.match(/\[\[/g) || []).length;
  const closeBrackets = (newText.match(/\]\]/g) || []).length;

  // Prevent typing if trying to add 5th opening bracket pair
  if (openBrackets > 4) {
    toast.error(
      "En fazla 4 boşluk ekleyebilirsiniz! Daha fazla [[ ekleyemezsiniz."
    );
    return;
  }

  // setQuestionText(newText);

  // Count existing bracket pairs
  const matches = newText.match(/\[\[[^\]]*\]\]/g) || [];

  // Check if trying to add more than 4 pairs
  if (matches.length > 4) {
    toast.error("En fazla 4 boşluk ekleyebilirsiniz!");
    return;
  }

  const extracted = [];
  // let processedText = newText;

  // Find all matches and extract content
  const bracketMatches = newText.match(/\[\[([^\]]*)\]\]/g) || [];

  bracketMatches.forEach((match) => {
    const content = match.slice(2, -2); // Remove [[ and ]]
    extracted.push(content);
  });

  // setAnswer(extracted);

  return [newText, extracted];
};
