import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedHandler } from "../../redux/questionSlice";
import { optionStyles } from "../../styles/optionStyles";
import {
  PiSealCheck,
  PiSealCheckBold,
  PiSealCheckFill,
  PiSealWarningFill,
} from "react-icons/pi";

const MultipleChoiceQuestion = () => {
  // const [selected, setSelected] = useState([]);
  const { questions, showAnswer, currentQuestionNo, selectedOptions } =
    useSelector((state) => state.question);
  const dispatch = useDispatch();

  const toggleOption = (id) => {
    if (showAnswer) return; // prevent changing after answer shown
    // setSelected((prev) =>
    //   prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    // );
    dispatch(
      selectedHandler(
        selectedOptions.includes(id)
          ? selectedOptions.filter((x) => x !== id)
          : [...selectedOptions, id]
      )
    );
  };

  // const isCorrect = () =>
  //   selectedOptions.length ===
  //     questions[currentQuestionNo].correctAnswers.length &&
  //   selectedOptions.every((val) =>
  //     questions[currentQuestionNo].correctAnswers.includes(val)
  //   );

  return (
    <div className="space-y-2 select-none">
      {questions[currentQuestionNo].options.map((opt) => {
        const isSelected = selectedOptions.includes(opt.id);
        const isCorrectAnswer = questions[currentQuestionNo].answer.includes(
          opt.id
        );

        const optS = optionStyles(showAnswer, isSelected, isCorrectAnswer);

        return (
          <div
            key={opt.id}
            className={`flex items-center gap-3 ${optS.base} ${optS.hoverStyle} ${optS.selectedStyle} ${optS.correctStyle} ${optS.correct} ${optS.incorrectStyle}`}
            onClick={() => toggleOption(opt.id)}
          >
            {isSelected ? (
              showAnswer && !isCorrectAnswer ? (
                <PiSealWarningFill className="text-xl" />
              ) : (
                <PiSealCheckFill className="text-xl" />
              )
            ) : (
              <PiSealCheckBold className="text-xl" />
            )}
            {opt.text}
          </div>
        );
      })}
    </div>
  );
};

export default MultipleChoiceQuestion;
