import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isCorrectHandler } from "../../redux/questionSlice";

const MultipleChoiceQuestion = () => {
  const [selected, setSelected] = useState([]);
  const quiz = useSelector((state) => state.question);
  const dispatch = useDispatch();

  const toggleOption = (id) => {
    if (quiz.showAnswer) return; // prevent changing after answer shown
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isCorrect = () =>
    selected.length ===
      quiz.questions[quiz.currentQuestionNo].correctAnswers.length &&
    selected.every((val) =>
      quiz.questions[quiz.currentQuestionNo].correctAnswers.includes(val)
    );

  useEffect(() => {
    dispatch(isCorrectHandler(isCorrect()));
  }, [selected]);

  return (
    <div className="space-y-2 select-none">
      {quiz.questions[quiz.currentQuestionNo].options.map((opt) => {
        const isSelected = selected.includes(opt.id);
        const isCorrectAnswer = quiz.questions[
          quiz.currentQuestionNo
        ].correctAnswers.includes(opt.id);

        const base = "w-full p-3 border-2 rounded-xl transition";
        const hoverStyle = quiz.showAnswer
          ? "cursor-not-allowed"
          : "cursor-pointer hover:bg-sky-900";
        const selectedStyle =
          isSelected && !quiz.showAnswer ? "bg-sky-700 border-sky-500" : "";
        const correctStyle =
          quiz.showAnswer && isCorrectAnswer && isSelected
            ? "border-green-600 bg-green-700 font-bold"
            : "";
        const incorrectStyle =
          quiz.showAnswer && isSelected && !isCorrectAnswer
            ? "border-red-500 bg-red-700"
            : "";
        const correct =
          quiz.showAnswer && isCorrectAnswer && !isSelected
            ? "border-green-600 text-green-600 font-bold"
            : "";

        return (
          <div
            key={opt.id}
            className={`${base} ${hoverStyle} ${selectedStyle} ${correctStyle} ${correct} ${incorrectStyle}`}
            onClick={() => toggleOption(opt.id)}
          >
            {opt.text}
          </div>
        );
      })}
    </div>
  );
};

export default MultipleChoiceQuestion;
