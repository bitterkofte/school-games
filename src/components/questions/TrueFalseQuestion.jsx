import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isCorrectHandler, selectedHandler } from "../../redux/questionSlice";
import { optionStyles } from "../../styles/optionStyles";

const TrueFalseQuestion = () => {
  // const [selected, setSelected] = useState(null);
  const { questions, showAnswer, currentQuestionNo, selectedOptions } =
    useSelector((state) => state.question);
  const dispatch = useDispatch();

  const handleSelect = (value) => {
    // if (!showAnswer) setSelected(value);
    if (!showAnswer) dispatch(selectedHandler(value));
  };

  // useEffect(() => {
  //   dispatch(
  //     isCorrectHandler(
  //       selectedOptions === questions[currentQuestionNo].correctAnswer
  //     )
  //   );
  // }, [selectedOptions, currentQuestionNo, dispatch, showAnswer]);

  return (
    <div className="space-y-2">
      {["True", "False"].map((opt) => {
        const isSelected = selectedOptions === opt;
        const isCorrectAnswer = questions[currentQuestionNo].answer === opt;

        const optS = optionStyles(showAnswer, isSelected, isCorrectAnswer);

        return (
          <div
            key={opt}
            className={`${optS.base} ${optS.hoverStyle} ${optS.selectedStyle} ${optS.correctStyle} ${optS.incorrectStyle} ${optS.correct}`}
            onClick={() => handleSelect(opt)}
          >
            {opt === "True" ? "Doğru" : "Yanlış"}
          </div>
        );
      })}
    </div>
  );
};

export default TrueFalseQuestion;
